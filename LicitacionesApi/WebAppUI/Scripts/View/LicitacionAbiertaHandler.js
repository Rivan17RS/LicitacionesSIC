$(document).ready(function () {
    // Obtener el valor del parámetro idLicitacion de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idLicitacion = urlParams.get('idLicitacion');
    CargarLicitacion(idLicitacion);

    $('#CrearOferta').on('click', function () {
        CrearOferta(idLicitacion);
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
                        var row = "<tr id='row" + productId + "' data-producto-id='" + productId + "'><td>" + product.Nombre + "</td><td>" + value.Cantidad + "</td>";

                        if (rol == "Usuario") {
                            row += "<td><input type='number' class='form-control form-control-sm cantidadProd' id='CantProd" + productId + "'></td><td><input type='number' class='form-control form-control-sm precioProd' id='PrecioProd" + productId + "'></td><td><input type='number' class='form-control form-control-sm montoProd' id='MontoProd" + productId + "' readonly></td>";
                        }

                        row += "<td class='d-none' id='productoId'>" + productId + "</td></tr>";


                        rows.push(row);
                    });

                promises.push(promise);
            });

            // Cuando se resuelven todas las promesas se actualiza la tabla
            Promise.all(promises).then(function () {
                $("#tblLicProducts tbody").html(rows.join(""));

                // Agregar evento onkeyup al input de cantidad para actualizar el valor del input de monto en la misma fila
                $(".cantidadProd").on("keyup", function () {
                    var cantidad = $(this).val();
                    var precio = $(this).closest("tr").find(".precioProd").val();
                    var monto = cantidad * precio;
                    $(this).closest("tr").find(".montoProd").val(monto);
                    sumarMonto();
                });

                $(".precioProd").on("keyup", function () {
                    var precio = $(this).val();
                    var cantidad = $(this).closest("tr").find(".cantidadProd").val();
                    var monto = cantidad * precio;
                    $(this).closest("tr").find(".montoProd").val(monto);
                    sumarMonto();
                });
            });
        },
    });
}



function CrearOferta(idLic) {

    var ofer = {};
    ofer.IdLicitacion = idLic;
    ofer.IdUsuario = parseInt(IdUserSession);
    ofer.FechaEntrega = $('#FechaEntregaOfer').val()
    ofer.MontoTotal = $('#MontoOfer').val();
    ofer.IdUsrCreacion = parseInt(IdUserSession);

    


    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        type: 'POST',
        url: "https://licitaciones-api.azurewebsites.net/api/Ofertas/CrearOfertas",
        contentType: "application/json",
        data: JSON.stringify(ofer),
        success: function (response) {
            ObtenerUltimaOferta().then(function (Ofer) {
                $('#tblLicProducts tbody tr').each(function () {
                    var IdProducto = $(this).find('#productoId').text();
                    var Cantidad = $(this).find('.cantidadProd').val();
                    CrearDetalleOferta(Ofer.Id, IdProducto, Cantidad);
                });
            });
        },
        error: function (xhr, status, error) {
            console.log(error);
            alert('Error, no se pudo crear');
        }
    });


}




function sumarMonto() {
    var montoTotal = 0;
    $("#tblLicProducts tbody tr").each(function () {
        var cantidadOferta = $(this).find(".montoProd").val();
        if (cantidadOferta) {
            montoTotal += parseFloat(cantidadOferta);
        }
    });
    $("#MontoOfer").val(montoTotal);
}

function CrearDetalleOferta(IdOfer, IdProducto, Cantidad) {
    var dOfer = {};
    dOfer.IdOferta = IdOfer;
    dOfer.IdProducto = IdProducto;
    dOfer.Cantidad = Cantidad;
    dOfer.IdUsrCreacion = parseInt(IdUserSession);

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        type: 'POST',
        url: "https://licitaciones-api.azurewebsites.net/api/DetalleOfertas/CrearDetalleOfertas",
        contentType: "application/json",
        data: JSON.stringify(dOfer),
        success: function (response) {
            console.log(response);

        },
        error: function (xhr, status, error) {
            console.log(error);

        }
    });

}


function ObtenerUltimaOferta() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://licitaciones-api.azurewebsites.net/api/Ofertas/ObtenerOfertas",
            method: "GET",
            success: function (data) {
                var ultimaOferta = data[data.length - 1];
                resolve(ultimaOferta);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Error en la llamada AJAX: " + errorThrown);
                reject(errorThrown);
            }
        });
    });
}

