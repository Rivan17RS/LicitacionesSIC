function PagosTable() {

    var arrColumns = [
        { "data": "IdUsuario" },
        { "data": "Monto" },
        { "data": "Descripcion" },
        { "data": "FechaCreacion" }
    ];


    if ($.fn.DataTable.isDataTable('#tblPagos')) {
        $('#tblPagos').DataTable().ajax.reload();
    }
    var tablaPagos = $('#tblPagos').DataTable({
        searching: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        },
        ajax: {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            type: "GET",
            url: "https://licitaciones-api.azurewebsites.net/api/PagosUsuario/ObtenerPagosUsuarios",
            contentType: "application/json",
            data: {},
            dataSrc: function (json) {
                console.log(json);
                var jsonResult = { 'data': json };
                console.log(jsonResult);
                return jsonResult.data;
            }
        },
        columns: arrColumns
    });
}


