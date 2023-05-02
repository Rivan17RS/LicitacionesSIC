var AddProductoSection = {
    init: function (productos) {
        this.cacheDom();

        this.loadProductos.then((productos) => {
            this.productos = productos;
            this.load(this, productos);
        }).catch((error) => { console.log(error) })
    },

    cacheDom: function () {
        this.$dropdown = $("#inventarioDropdown");
        this.$agregarProducto = $("#agregarProducto");
        this.$cantidadInput = $("#cantidadInput");
        this.$inputWarning = $("#inputWarning");
        this.$inputSuccess = $("#inputSuccess");
        this.$precioInput = $("#precioInput");
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
    }),

    buscarProducto: function (id, productos) {
        var productoFound = {};

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].Id === id) {
                productoFound = productos[i];
            }
        };

        if (productoFound === {}) {
            return null;
        }
        return productoFound;
    }
}

var Table = {
    // the JSON mapper to map the loadProductosDetails json returned file.
    // notes: data: null if to be used to wait for the final rendering of the action buttons of the rows.
    data: {
        text: [
            { data: "IdProducto"},
            { data: "Nombre" },
            { data: "Descripcion" },
            { data: "Cantidad" },
            { data: "PrecioUnidad" }
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
            url: "https://licitaciones-api.azurewebsites.net/api/StockProductos/GetProductoDetailsFromUser?userIdentificacion=" + userId,
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
                buttons: ["guardar"],
                dom: "Blftip",
                searching: true,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
                },
                ajax: self.getStockProductosAjax(),
                columns: self.data.text,
                columnDefs: [
                    {
                        targets: [5], render: () => {
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

        if (productoFound === {}) {
            return null;
        }
        return productoFound;
    },

    updateProducto: function updateProductoUser(id, cantidad, tablaHTML) {

        self = this;
        self.$tabla.DataTable().rows().every((rowIndex, TableLoop, ColumnLoop) => {

            console.log("looping using " + id + " and cantidad: " + cantidad);
            if (self.$tabla.DataTable().row(rowIndex).data()[0] === id) {
                self.$tabla.DataTable().cell(rowIndex, 3).data(cantidad).draw();
            }
        });

        self.$tabla.DataTable().draw();
    },

    updateProductoDB: function (producto) {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "https://licitaciones-api.azurewebsites.net/api/StockProductos/ActualizarProductoUsuario",
            data: JSON.stringify(producto),
            sucess: (success) => {
                console.log(success.Content);
            },
            error: (error) => {
                console.log(error);
            }
        })
    },

    eliminarProductoDB: function (producto) {

        var url = `https://licitaciones-api.azurewebsites.net/api/StockProductos/EliminarProductoUsuario?IdUsuario=${producto.IdUsuario}&IdProducto=${producto.IdProducto}`
        console.log(url);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            sucess: (success) => {
                console.log(success.Content);
            },
            error: (error) => {
                console.log(error);
            }
        })
    },

    saveProductoDB: function (producto) {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "https://licitaciones-api.azurewebsites.net/api/StockProductos/AnadirProductoUsuario?IdUsuario=",
            data: JSON.stringify(producto),
            success: (success) => {
                console.log(success.Content)
            },
            error: (error) => {
                console.log(error.Content)
            }
        })

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

        producto = {
            IdUsuario: Id,
            IdProducto: rowData.IdProducto
        };

        Table.eliminarProductoDB(producto);

        tablaHTML.row(row).remove().draw();
    })

    $('#tblInventario tbody').on('click', 'tr .substract', function () {
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        
        var cantidad = rowData.Cantidad;
        if (cantidad > 1) {
            tablaHTML.cell(row, 3).data(cantidad - 1).draw();

            var producto = {
                IdUsuario: Id,
                IdProducto: rowData.IdProducto,
                Cantidad: rowData.Cantidad,
                PrecioUnidad: rowData.PrecioUnidad
            }

            Table.updateProductoDB(producto);
        } else {
            tablaHTML.row(row).remove().draw();
        }
    })

    $('#tblInventario tbody').on('click', 'tr .add', function () {
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        var cantidad = parseInt(rowData.Cantidad);
        tablaHTML.cell(row, 3).data(cantidad + 1);

        var producto = {
            IdUsuario: Id,
            IdProducto: rowData.IdProducto,
            Cantidad: rowData.Cantidad,
            PrecioUnidad: rowData.PrecioUnidad
        }

        Table.updateProductoDB(producto);
    })


    AddProductoSection.init();

    AddProductoSection.$agregarProducto.on('click', function () {

        var dropwdownValue = AddProductoSection.$currentSelection;

        var inputWarning = AddProductoSection.$inputWarning;
        var inputSucess = AddProductoSection.$inputSuccess;

        var cantidadInput = AddProductoSection.$cantidadInput;

        var currentSelection = AddProductoSection.getCurreSelection();


        console.log(AddProductoSection.$cantidadInput.val());
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

        var selection = parseInt(currentSelection.val())

        // obtiene los detalles de producto haciendo el match con el id seleccionado 
        let producto = AddProductoSection.buscarProducto(selection, AddProductoSection.productos);

        let productoExist = Table.buscarProductoDetails(parseInt(currentSelection.val()), Table.getProductosDetails());

        console.log(Table.getProductosDetails());
        console.log(productoExist);


        let isempty = (productoExist // 👈 null and undefined check
            && Object.keys(productoExist).length === 0
            && Object.getPrototypeOf(productoExist) === Object.prototype)

        console.log(productoExist);
        console.log(isempty);

        if (!isempty) {
            productoExist.Cantidad += parseInt(cantidadInput.val());

            Table.$tabla.DataTable().rows().every((rowIndex, TableLoop, ColumnLoop) => {

                if (Table.$tabla.DataTable().row(rowIndex).data()[0] === productoExist.IdProducto) {

                    Table.$tabla.DataTable().cell(rowIndex, 3).data(productoExist.Cantidad);

                    this.invalidate();
                }

                Table.updateProductoDB(productoExist);

                Table.$tabla.DataTable().ajax.reload();
            });

            Table.$tabla.DataTable().destroy();
            Table.$tabla.DataTable().draw();
        }

        else {
            var cantidad = cantidadInput.val();

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

            var precioInput = AddProductoSection.$precioInput.val()

            // testing - have to delete
            let idprod = producto.Id;
            let nombreprod = producto.Nombre;

            var parameters = {
                "IdProducto": idprod,
                "Nombre": nombreprod,
                "Descripcion": producto.Descripcion,
                "Cantidad": cantidad,
                "PrecioUnidad": precioInput,
                "Actions": actionsRow
            };

            var producto_new = {
                "IdUsuario": Id,
                "IdProducto": idprod.toString(),
                "Cantidad": cantidad,
                "PrecioUnidad": precioInput,
                "IdUsrCreacion": Id
            }


            Table.saveProductoDB(producto_new);

            tablaHTML.row.add(parameters).draw();
        }
    });
})

