var tablacargadaPagos = 0;


function PagosTable() {

    var arrColumns = [
        { "data": "IdUsuario" },
        { "data": "Monto" },
        { "data": "Descripcion" },
        { "data": "FechaCreacion" }
    ];

    if (tablacargadaPagos== 1) {
        if ($.fn.DataTable.isDataTable('#tblPagos')) {
            $('#tblPagos').DataTable().ajax.reload();
        }
    } else { 
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
            type: "POST",
            url: "https://licitaciones-api.azurewebsites.net/api/PagosUsuario/ObtenerPagosUsuariosFiltro",
            contentType: "application/json",
            data: function (d) {
                return JSON.stringify(getFiltros())
            },
            dataSrc: function (json) {
                console.log(json);
                var jsonResult = { 'data': json };
                console.log(jsonResult);
                tablacargadaPagos = 1;
                return jsonResult.data;
            }
        },
        columns: arrColumns
    });

        function getFiltros() {
            var pago = {};
            pago.IdUsuario = $('#filtroIdUsuarioPago').val();
            pago.Monto = $('#filtroMontoPago').val();
            pago.Descripcion = $('#filtroDescripcionPago').val();
            pago.FechaCreacion = $('#filtroFechaPago').val();

            return pago;
        }
    }
}

$('#btnLimpiarPagos').on('click', function () {
    $("#filtroPago")[0].reset();
});

$('#btnBuscarPagos').on('click', function () {
    PagosTable();
});