$(document).ready(function () {
    // Obtener el valor del parámetro idLicitacion de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idLicitacion = urlParams.get('idLicitacion');
    CargarLicitacion(idLicitacion);

    $('#CrearOferta').on('click', function () {
        CrearOferta();
    });
});



function CargarLicitacion(IdLic) {
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Licitacion/ObtenerLicitacion/" + IdLic, //FORCED, TBR'd
        // Need to find a way to move idlicitacion into tempdata from licitacion to use it here for the url
        contentType: "application/json",
        success: function (data) {
            licitacion = data;

            var FechaCierreOfertas = licitacion.FechaCierreOfertas
            var FechaCierreOfertasCulled = new Date(FechaCierreOfertas).toLocaleDateString();

            $("#topInfo").html('<small class="text-muted mt-5">' + licitacion.Id + '</small><br /><span class="editable">' + licitacion.Titulo + '</span>');
            $("#estadoLicitacion").text(licitacion.Estado);
            $("#descripcionLicitacion").val(licitacion.Descripcion);
            $("#direccionLicitacion").text(licitacion.LugarEntrega);
            $("#expiracionLicitacion").text(FechaCierreOfertasCulled);
            if ($("#presupuestoLicitacion").val() != null) {
                $("#presupuestoLicitacion").text("CRC " + licitacion.MontoPresupuestado);
            }
            CargarProductosLicitaciones(IdLic)
        },
    });
}

//Licitacion get info tabla
function CargarProductosLicitaciones(IdLic) {
    $.ajax({
        searching: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        },
        method: "GET",
        url: "https://licitaciones-api.azurewebsites.net/api/DetalleLicitaciones/ObtenerDetalleLicitacionesId?IdLicitacion=" + IdLic,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            var promises = [];
            var rows = [];

            // Itera sobre los detalles de la licitación
            $.each(data, function (index, value) {
                var productId = value.Idproducto;

                // obtener el producto correspondiente
                var promise = $.getJSON("https://licitaciones-api.azurewebsites.net/api/Producto/ObtenerProducto/" + productId)
                    .then(function (product) {
                        // Crea una fila por cada producto
                        var row = "<tr><td>" + product.Nombre + "</td><td>" + value.Cantidad + "</td>";

                        if (rol == "Usuario") {
                            row += "<td><input type='number' class='form-control form-control-sm' id='CantProd" + productId + "'></td><td><input type='number' class='form-control form-control-sm' id='PrecioProd" + productId + "'></td>";
                        }

                        row += "</tr>";




                        rows.push(row);
                    });


                promises.push(promise);
            });

            // Cuando se resuelven todas las promesas se actualiza la tabla
            Promise.all(promises).then(function () {
                $("#tblLicProducts tbody").html(rows.join(""));
            });
        },
    });

}


function CrearOferta() {

}


