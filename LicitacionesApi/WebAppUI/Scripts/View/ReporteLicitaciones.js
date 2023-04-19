function mostrarDetallesLicitacion(idLicitacion) {
    // Crea un array para guardar las filas de la tabla que se van a mostrar en el modal
    var filasDetalles = [];

    // Agrega la estructura de la tabla y los encabezados
    filasDetalles.push('<table class="table"><thead><tr><th>ID Licitación</th><th>ID Producto</th><th>Producto</th><th>Cantidad</th></tr></thead><tbody>');

    $.ajax({
        searching: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        },
        method: "GET",
        url: "https://licitaciones-api.azurewebsites.net/api/DetalleLicitaciones/ObtenerDetalleLicitacionesId?IdLicitacion=" + idLicitacion,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            // Itera sobre los detalles de la licitación
            var promises = [];
            $.each(data, function (index, value) {
                var promise = $.getJSON("https://licitaciones-api.azurewebsites.net/api/Producto/ObtenerProducto/" + value.Idproducto)
                    .then(function (product) {
                        return "<tr><td>" + value.IdLicitacion + "</td><td>" + value.Idproducto + "</td><td>" + (product ? product.Nombre : "Error al obtener producto") + "</td><td>" + value.Cantidad + "</td></tr>";
                    });
                promises.push(promise);
            });

            // Cuando todas las promesas hayan sido resueltas, cierra la estructura de la tabla y muestra el modal con la tabla
            Promise.all(promises).then(function (filas) {
                filasDetalles.push(filas.join(""));
                filasDetalles.push("</tbody></table>");

                // Actualiza el cuerpo de la tabla del modal con la nueva tabla creada
                $("#tblDetallesLicitacionBody").html(filasDetalles.join(""));

                $('#detalleModal').modal('show');
            });
        },
    });
}



function LicitacionesTable() {
    var arrColumns = [
        { 'data': 'IdAnalista' },
        { 'data': 'Id' },
        { 'data': 'Titulo' },
        { 'data': 'Descripcion' },
        { 'data': 'LugarEntrega' },
        { 'data': 'FechaCierreOfertas' },
        { 'data': 'MontoPresupuestado' },
        { 'data': 'Estado' }
    ];
    if ($.fn.DataTable.isDataTable('#tblLicitaciones')) {
        $('#tblLicitaciones').DataTable().destroy();

    }

    var tablaLicitaciones = $('#tblLicitaciones').DataTable({
        searching: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        },
        ajax: {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://licitaciones-api.azurewebsites.net/api/Licitacion/ObtenerLicitacionesFiltro",
            contentType: "application/json",
            data: function (d) {
                return JSON.stringify(getFiltros())
            },
            dataSrc: function (json) {
                console.log(json);
                var jsonResult = { 'data': json };
                console.log(jsonResult);
                return jsonResult.data;
            }
        },
        columns: arrColumns,
    });
    $('#tblLicitaciones tbody').off('click', 'tr').on('click', 'tr', function () {
        var licitacionId = $(this).find('td:eq(1)').text();
        mostrarDetallesLicitacion(licitacionId);
    }).css('cursor', 'pointer').attr('title', 'Click para ver detalles');

    function getFiltros() {
        var lic = {};
        lic.IdAnalista = $('#filtroAnalista').val();
        lic.Id = $('#filtroIdLicitacion').val();
        lic.LugarEntrega = $('#filtroLugarEntrega').val();
        lic.Titulo = $('#filtroTitulo').val();
        lic.MontoPresupuestado = $('#filtroMontoPresupuestado').val();
        lic.Estado = $('#filtroEstadoLic').val();
        lic.FechaCierreOfertas = $('#filtroCierreOfertas').val();

        return lic;
    }
}

$('#btnBuscarLicitaciones').on('click', function () {
    LicitacionesTable();
});

$('#btnLimpiarLicitaciones').on('click', function () {
    $("#filtroLicitaciones")[0].reset();

})









