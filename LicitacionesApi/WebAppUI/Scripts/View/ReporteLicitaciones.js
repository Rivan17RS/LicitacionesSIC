﻿
//function mostrarDetallesLicitacion(idLicitacion) {
//    $('#tblDetallesLicitacion').remove();
//    $('#titleDetallesLicitacion').remove();

//    $.ajax({
//        method: "GET",
//        url: "https://localhost:44369/api/DetalleLicitaciones/ObtenerDetalleLicitacionesId?IdLicitacion=" + idLicitacion,
//        contentType: "application/json;charset=utf-8",
//        success: function (data) {

//            var promises = [];
//            var tablaDetalles = "<br><h2 id='titleDetallesLicitación' >Detalles Licitacion</h2><br><table id='tblDetallesLicitacion' class='table table-hover table-light'>";
//            tablaDetalles += "<thead><tr><th>IdLicitacion</th><th>IdProducto</th><th>Producto</th><th>Cantidad</th></tr></thead>";
//            tablaDetalles += "<tbody>";
//            $.each(data, function (index, value) {
//                var promise = $.ajax({
//                    method: "GET",
//                    url: "#" + value.Idproducto,
//                    contentType: "application/json;charset=utf-8"
//                }).then(function (producto) {
//                    tablaDetalles += "<tr><td>" + value.IdLicitacion + "</td><td>" + value.Idproducto + "</td><td>" + producto.Nombre + "</td><td>" + value.Cantidad + "</td></tr>";
//                });
//                promises.push(promise);
//            });
//            Promise.all(promises).then(function () {
//                tablaDetalles += "</tbody></table>";
//                $('#tblLicitaciones').after(tablaDetalles);
//            });
//        }
//    });
//}


//funcion de testing

function mostrarDetallesLicitacion(idLicitacion) {
    $('#tblDetallesLicitacion').remove();
    $('#titleDetallesLicitacion').remove();
    $.ajax({
        method: "GET",
        url: "https://licitaciones-api.azurewebsites.net/api/DetalleLicitaciones/ObtenerDetalleLicitacionesId?IdLicitacion=" + idLicitacion,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            var tablaDetalles = "<br><h2 id='titleDetallesLicitacion' >Detalles Licitación</h2><br><table id='tblDetallesLicitacion' class='table table-hover table-light'>";
            tablaDetalles += "<thead><tr><th>Id Licitación</th><th>Id Producto</th><th>Producto</th><th>Cantidad</th></tr></thead>";
            tablaDetalles += "<tbody>";
            $.each(data, function (index, value) {
                var product = Products.find(p => p.Id === value.Idproducto);
                if (product) {
                    tablaDetalles += "<tr><td>" + value.IdLicitacion + "</td><td>" + value.Idproducto + "</td><td>" + product.Nombre + "</td><td>" + value.Cantidad + "</td></tr>";
                } else {
                    tablaDetalles += "<tr><td>" + value.IdLicitacion + "</td><td>" + value.Idproducto + "</td><td>Producto no encontrado</td><td>" + value.Cantidad + "</td></tr>";
                }
            });
            tablaDetalles += "</tbody></table>";
            $('#tblLicitaciones').after(tablaDetalles);
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









