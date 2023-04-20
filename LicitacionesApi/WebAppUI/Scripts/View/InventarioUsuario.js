var AddProductoSection = {
    init: function (productos) {
        this.cacheDom();

        this.loadProductos.then((productos) => {
            this.load(this, productos);
        }).catch((error) => { console.log(error) })
    },

    cacheDom: function () {
        this.$dropdown = $("#inventarioDropdown");
        this.$agregarProducto = $("#agregarProducto");
        this.$cantidadInput = $("#cantidadInput");
        this.$inputWarning = $("#inputWarning");
        this.$inputSuccess = $("#inputSuccess");
    },

    load: function (self, productos) {
        $.each(productos, function (index, producto) {
            var option = document.createElement('option');
            option.value = producto.Id;
            option.text = producto.Nombre + " : " + producto.Descripcion;

            self.$dropdown.append(option);
        });
    },

    getCurreSelection: function () {
        return $("#inventarioDropdown :selected");
    },

    isValidInput: function () {
        return (parseInt(this.$currentSelection.val()) === 0 || parseInt(this.$cantidadInput.val()) === 0 || parseInt(this.$cantidadInput.val()) < 0 || this.$cantidadInput.val() === "")
    },

    // loads productos data.
    loadProductos: new Promise((resolve, reject) => {

        $.ajax({
            type: "GET",
            url: "https://licitaciones-api.azurewebsites.net/api/producto/obtenerproductos",
            success: function (data) {
                resolve(data)
            },
            error: function (request, status, error) {
                reject(error)
            }
        })
    })
}

var Table = {
    // the JSON mapper to map the loadProductosDetails json returned file.
    // notes: data: null if to be used to wait for the final rendering of the action buttons of the rows.
    data: {
        text: [
            { data: "Nombre" },
            { data: "Descripcion" },
            { data: "Cantidad" },
            { data: "PrecioUnidad" },
            {data: null}
        ]
    },

    // we store the data from loadProductos.
    productosData: {},

    // main function.
    init: function () {
        this.cacheDom();
        this.load();
    },

    // save variables.
    cacheDom: function () {
        this.$tabla = $("#tblInventario");
        this.$tablaBody = `#tblInventario tbody`;

    },

    // returns the ajax for the datatable initial loading
    getStockProductosAjax: function () {

        return {
            headers: {
                'Accept': "application/json",
                    'Content-Type': "application/json"
            },
            type: "GET",
            url: "https://localhost:44369/api/StockProductos/GetProductoDetailsFromUser?userIdentificacion=" + userId,
                    contentType: "application/json;charset=utf-8",
            error: function (request, status, error) {
                console.log("Error al cargar los datos detalles productos");
                console.log(userId)
            },
            dataSrc: function (json) {
                var jsonResult = { 'data': json };
                return jsonResult.data;
            }
        }
    },

    // initialize the datatable.
    // 1. loads the data with the API.
    // 2. render the buttons in the last column.
    // 3. returns a promise for asyncronious loading.
    loadDetalleProductos: function (self) {

        return new Promise((resolve, reject) => {
           self.$tabla.DataTable({
                searching: true,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
                },
                ajax: self.getStockProductosAjax(),
                columns: self.data.text,
                columnDefs: [
                    {
                        targets: [4], render: () => {
                            var actionsRow = $('<div>').addClass('btn-group').attr('role', 'group');
                            var eliminarBtn = $('<button>').addClass('btn btn-sm eliminar')
                                .attr('data-toggle', 'tooltip').attr('title', 'Eliminar')
                                .append($('<i>').addClass('fas fa-trash-alt'));
                            var substractBtn = $('<button>').addClass('btn btn-sm substract')
                                .attr('data-toggle', 'tooltip').attr('title', 'Substract')
                                .append($('<i>').addClass('fas fa-minus'));
                            var addBtn = $('<button>').addClass('btn btn-sm add')
                                .attr('data-toggle', 'tooltip').attr('title', 'Add')
                                .append($('<i>').addClass('fas fa-plus'));

                            actionsRow.append(eliminarBtn).append(substractBtn).append(addBtn);
                            return actionsRow.prop("outerHTML");
                        }
                    }
                ]
           })

           resolve("success")
        })
    },

    // loads data and retuns "resolved" if succeeded
    load: function () {
        this.loadDetalleProductos(this).then((resolve) => {
            
        }).catch((error) => {
            console.log(error)
        })
    },

    // obtener la lista de detalles de los productos
    getProductosDetails: function () {
        return this.$tabla.DataTable().rows().data();
    },

    // buscar un detalle de producto especifico
    buscarProductoDetails: function (id, producto_user) {
        var productoFound = {};

        for (let i = 0; i < producto_user.length; i++) {
            if (producto_user[i].IdProducto === id) {
                productoFound = producto_user[i];
            }
        };

        return productoFound;
    }
};

$(document).ready(function () {

    // initial table loading.
    Table.init();

    // loading of table.
    var tablaHTML = $('#tblInventario').DataTable();

    // buttons events initialization.
    $('#tblInventario tbody').on('click', 'tr .eliminar', function () {
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        var productId = rowData[0];
        var cantidad = rowData[2];
        producto_user.forEach(function (producto) {
            if (producto.Id === productId && producto.userId === $('#tblInventario').data('user')) {
                producto.cantidad -= cantidad;
                if (producto.cantidad <= 0) {
                    producto_user.splice(producto_user.indexOf(producto), 1);
                }
            }
        });
        tablaHTML.row(row).remove().draw();
    })

    $('#tblInventario tbody').on('click', 'tr .substract', function () {
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        var cantidad = rowData[2];
        if (cantidad > 1) {
            tablaHTML.cell(row, 2).data(cantidad - 1).draw();
        } else {
            tablaHTML.row(row).remove().draw();
        }
    })

    $('#tblInventario tbody').on('click', 'tr .add', function () {
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        var cantidad = parseInt(rowData[2]);
        tablaHTML.cell(row, 2).data(cantidad + 1).draw();
    })


    AddProductoSection.init();

    AddProductoSection.$agregarProducto.on('click', function () {

        var dropwdownValue = AddProductoSection.$currentSelection;

        var inputWarning = AddProductoSection.$inputWarning;
        var inputSucess = AddProductoSection.$inputSuccess;

        var currentSelection = AddProductoSection.getCurreSelection();


        console.log(currentSelection.val(), AddProductoSection.$cantidadInput.val());
        if ((parseInt(currentSelection.val()) === 0 || parseInt(AddProductoSection.$cantidadInput.val()) === 0 || parseInt(AddProductoSection.$cantidadInput.val()) < 0 || AddProductoSection.$cantidadInput.val() === "")) {
            console.log(inputWarning);
            inputWarning.removeClass("d-none");
            inputSucess.addClass("d-none");
            return
        }

        else {
            inputWarning.addClass("d-none");
            inputSucess.removeClass("d-none");
        }

        //var producto = LookupProducto(parseInt(dropwdownValue));

        var productoUser = Table.buscarProductoDetails(parseInt(currentSelection.val()), Table.getProductosDetails());

        console.log(productoUser);
        /*if (productoUser.Id === producto.Id) {
            console.log(productoUser.Id, producto.Id, ": verifying if producto: " + producto.Nombre + " exists")
            productoUser.cantidad += parseInt(cantidadInput.val());
            updateProductoUser(productoUser.Id, productoUser.cantidad);
        }

        else {
            var cantidad = cantidadInput.val();
            tablaHTML.row.add([producto.Id, producto.Nombre, cantidad, actionsRow]).draw();
        }*/
    });
})