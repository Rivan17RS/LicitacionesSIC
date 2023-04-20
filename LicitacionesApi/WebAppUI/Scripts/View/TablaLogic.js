var Table = {
    data: {
        text: [
            { data: "Nombre" },
            { data: "Descripcion" },
            { data: "Cantidad" },
            { data: "PrecioUnidad" }
        ],
        actions: $('<div>').addClass('btn-group').attr('role', 'group')
                    .append($('<button>').addClass('btn btn-sm btn-outline-danger eliminar')
                    .attr('data-toggle', 'tooltip').attr('title', 'Eliminar')
                    .append($('<i>').addClass('fas fa-trash-alt')))
                    .append($('<button>').addClass('btn btn-sm btn-outline-danger substract')
                    .attr('data-toggle', 'tooltip').attr('title', 'Substract')
                    .append($('<i>').addClass('fas fa-minus')))
                    .append($('<button>').addClass('btn btn-sm btn-outline-danger add')
                    .attr('data-toggle', 'tooltip').attr('title', 'Add')
                    .append($('<i>').addClass('fas fa-plus')))
    },
    userData: {},
    productosData: {},

    init: function () {
        this.cacheDom();
        this.load();
    },

    cacheDom: function () {
        this.$tabla = "#tblInventario";
        this.$tablaJ = $(this.$tabla);
        this.$tablaBody = `#tblInventario tbody`;
    },

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

                console.log(userId)
                console.log(json);
                var jsonResult = { 'data': json };
                return jsonResult.data;
            }
        }
    },
    loadDetalleProductos: function (self) {

        return new Promise((resolve, reject) => {
           self.$tablaJ.DataTable({
                searching: true,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
                },
                ajax: self.getStockProductosAjax(),
                columns: self.data.text,
               initComplete: () => {
                   self.$tablaJ.row.every(() => {
                       console.log("printing");
                   })
               }
           })

           resolve("success")
        })
    },

    load: function () {
        this.loadDetalleProductos(this).then((resolve) => {
            console.log("resolved")
            
        }).catch((error) => {
            console.log(error)
        })
    },

    transform: {
        getNameFromStock(productos, stockproductos) {

            let data = []

            for (let product in stockproductos) {

                for (let producto in productos) {
                    product.IdProducto = producto.Id
                    data.append({
                        "id": product.IdProducto,
                        "Name": producto.Nombre,
                        "Descripcion": producto.Descripcion,
                        "Cantidad": product.Cantidad
                    })
                }
            }

            return data;
        }
    }
};

$(document).ready(function () {

    Table.init();
})