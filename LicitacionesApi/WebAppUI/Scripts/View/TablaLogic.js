var Table = {
    data: [
        { data: "IdUsuario" },
        { data: "IdProducto" },
        { data: "Cantidad" },
        { data: "PrecioUnidad" }
    ],
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

    loadUsuarios: new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "https://licitaciones-api.azurewebsites.net/api/usuario/obtenerusuarios",
            success: function (json) {
                resolve(json)
            },
            error: function (request, status, error) {
                reject(error);
            }
        })
    }),

    getStockProductosAjax: function () {

        let usrData = this.userData;
        let productData = this.productosData;
        return {
            headers: {
                'Accept': "application/json",
                    'Content-Type': "application/json"
            },
            type: "GET",
                url: "https://licitaciones-api.azurewebsites.net/api/StockProductos/GetAllStockProductos",
                    contentType: "application/json;charset=utf-8",
                        error: function (request, status, error) {
                            console.log("oops");
                        },
            dataSrc: function (json) {

                console.log("datos obtenidos");
                console.log(usrData);
                console.log(productData);

                console.log(json);
                var jsonResult = { 'data': json };
                return jsonResult.data;
            }
        }
    },

    load: function () {

        // cargar usuarios y productos en promesas
        Promise.all([
            this.loadUsuarios,
            this.loadProductos
        ]).then((json) => {

            this.userData = json[0]
            this.productosData = json[1]

            this.$tablaJ.DataTable({
                searching: true,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
                },
                ajax: this.getStockProductosAjax(),
                columns: this.data
            })

        }).catch((error) => {
            console.log(error);
        })

        //this.loadProductos.then((json) => console.log(json)).catch((error) => console.log(error));

        // cargar productos
        //this.loadProductos();

        // cargar stockproductos
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