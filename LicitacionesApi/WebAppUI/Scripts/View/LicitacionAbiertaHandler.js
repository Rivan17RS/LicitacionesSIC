$(document).ready(function () {
    // Obtener el valor del parámetro idLicitacion de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idLicitacion = urlParams.get('idLicitacion');
    CargarLicitacion(idLicitacion);

    $('#CrearOferta').on('click', function () {
        CrearOferta(idLicitacion);
    });
    $('#ModalOfertas').on('click', function () {
        cargarOfertas();
    });
});



function CargarLicitacion(IdLic) {
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Licitacion/ObtenerLicitacion/" + IdLic, 
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
            location.reload();

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

function ObtenerOfertas() {
    const urlParam = new URLSearchParams(window.location.search);
    const idLic = urlParam.get('idLicitacion');

    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Ofertas/ObtenerOfertasPorIdLicitacion?IdLicitacion=" + idLic,
        contentType: "application/json",
    });
}

function ObtenerUsuarioId(IdUser) {
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Usuario/ObtenerUsuarioID/" + IdUser,
        contentType: "application/json",
    });
}

function ObtenerDetalleOferta(IdOfer) {
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/DetalleOfertas/ObtenerDetalleOfertasPorIdOfer?IdOferta=" + IdOfer,
        contentType: "application/json",
    });
}

function ObtenerProducto(IdProduc) {
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Producto/ObtenerProducto/" + IdProduc,
        contentType: "application/json",
    });
}


function cargarOfertas() {

    //ObtenerOfertas().done(function (data) {
    //    const ofertas = data;
    //    const promises = [];

    //    for (let i = 0; i < ofertas.length; i++) {
    //        const oferta = ofertas[i];

    //        const promiseUsuario = ObtenerUsuarioId(oferta.IdUsuario);
    //        const promiseDetalleOferta = ObtenerDetalleOferta(oferta.Id);

    //        promises.push(
    //            $.when(promiseUsuario, promiseDetalleOferta).done(function (usuario, detallesOferta) {
    //                const cardHeader = `<div class="card-header">
    //                            <h3 class="mt-2">${usuario[0].Nombre + " " + usuario[0].Apellidos}</h3>
    //                          </div>`;

    //                let cardDetallesHtml = '';
    //                for (let j = 0; j < detallesOferta.length; j++) {
    //                    const detalleOferta = detallesOferta[j];
    //                    const promiseProducto = ObtenerProducto(8);

    //                    promises.push(
    //                        $.when(promiseProducto).done((producto) => { 
    //                            cardDetallesHtml += `<p>${producto.Nombre} - Cantidad: ${detalleOferta[j].Cantidad}</p>`;
    //                        })
    //                    );
    //                }

    //                const cardBody = `<div class="card-body">
    //                          <form>
    //                            <fieldset>
    //                              <div class="form-check">
    //                                <input class="form-check-input" onclick="return false;" type="checkbox" value="" checked id="offerChecksForm" />
    //                                <label class="form-check-label" for="offerChecksForm">Presupuesto</label>
    //                                <p>CRC ${oferta.Presupuesto}</p>
    //                              </div>
    //                              <div class="form-check">
    //                                <input class="form-check-input" onclick="return false;" type="checkbox" value="" checked id="offerChecksForm" />
    //                                <label class="form-check-label" for="offerChecksForm">Fecha de Entrega</label>
    //                                <p>${oferta.FechaEntrega}</p>
    //                              </div>
    //                              <div class="form-check">
    //                                <input class="form-check-input" onclick="return false;" type="checkbox" value="" id="offerChecksForm" />
    //                                <label class="form-check-label" for="offerChecksForm">Detalle de la oferta</label>
    //                                <br />
    //                                ${cardDetallesHtml}
    //                              </div>
    //                            </fieldset>
    //                          </form>
    //                        </div>`;

    //                const cardFooter = `<div class="card-footer row justify-content-between pb-6">
    //                            <button type="button" class="btn btn-outline-primary my-4" id="btnAceptarLicitacion">Aceptar</button>
    //                          </div>`;

    //                const card = `<div class="card m-2">
    //                      ${cardHeader}
    //                      ${cardBody}
    //                      ${cardFooter}
    //                    </div>`;

    //                $('.modal-body').append(card);
    //            })
    //        );
    //    }

    //    $.when.apply($, promises).done(function () {
    //        console.log('Ofertas cargadas exitosamente');
    //    });
    //    $('#exampleModalToggle').show();
    //});
}


