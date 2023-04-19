var Table = {
    data: [
        { data: "IdUsuario" },
        { data: "IdProducto" },
        { data: "Cantidad" },
        {data: "PrecioUnidad"}
    ],

    init: function () {
        this.cacheDom();
        this.load();
    },

    cacheDom: function () {
        this.$tabla = "#tblInventario";
        this.$tablaJ = $(this.$tabla);
        this.$tablaBody = `#tblInventario tbody`;
    },

    render: function () {

    },

    ajax: {
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

            var jsonResult = { 'data': json };
            return jsonResult.data;
        }
    },

    load: function () {

        $(this.$tabla).DataTable({
            searching: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
            },
            ajax: this.ajax,
            columns: this.data
        })
    }
};

Table.init();