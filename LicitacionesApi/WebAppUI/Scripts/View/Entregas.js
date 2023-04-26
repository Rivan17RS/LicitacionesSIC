﻿var cameraOpen = false;
var video;

function openCamera() {
    if (cameraOpen) {
        // Si la cámara ya está abierta, detener el stream y eliminar el elemento de video
        video.srcObject.getTracks()[0].stop();
        video.remove();
        cameraOpen = false;
        return;
    }
    cameraOpen = true; // Marcar la cámara como abierta
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video = document.createElement('video');
            video.setAttribute('autoplay', '');
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('id', 'videoQR');
            video.srcObject = stream;
            document.getElementById("camera-container").appendChild(video);
        })
        .catch(function (err) {
            console.log(err);
        });
}



$(document).ready(function () {

    $("#btnBuscarLic").on('click', function () {
        try {
            var lic = $('#LicNumber').val();
            mostrarDetallesLicitacion(lic);
        } catch (e) {
            alert("La licitación no existe")
        }
    });
})




//obtener licitacion y detalles para completar los datos 

function mostrarDetallesLicitacion(idLicitacion) {
    // Crea un array para guardar las filas de la tabla que se van a mostrar en la tabla
    var filasDetalles = [];

    // Agrega la estructura de la tabla y los encabezados
    filasDetalles.push('<table class="table table-striped" id="detallesTable"><thead><tr><th></th><th>Producto</th><th>Cantidad esperada</th><th>Cantidad recibida</th><th>Estado</th></tr></thead><tbody>');

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
                        return '<tr><td><div class="form-check"><input class="form-check-input" type="checkbox" name="producto' + value.Idproducto + '"></div></td><td>' + (product ? product.Nombre : "Error al obtener producto") + '</td><td><input type="number" class="form-control form-control-sm" value="' + value.Cantidad + '" readonly></td><td><input type="number" class="form-control form-control-sm" name="producto' + value.Idproducto + '_cantidad"></td><td><select class="form-control form-control-sm" name="producto' + value.Idproducto + '_estado"><option value=""></option><option value="bien">Bien</option><option value="danado">Dañado</option><option value="incompleto">Incompleto</option><option value="faltante">Faltante</option></select></td></tr>';
                    });
                promises.push(promise);
            });
            $("#NumLicitacionNav").text(idLicitacion);


            // Cuando todas las promesas hayan sido resueltas, cierra la estructura de la tabla y actualiza la tabla con los detalles
            Promise.all(promises).then(function (filas) {
                filasDetalles.push(filas.join(""));
                filasDetalles.push("</tbody></table>");

                // Actualiza el cuerpo de la tabla con la nueva tabla creada
                $("#detallesTable").replaceWith(filasDetalles.join(""));

                // Muestra la tabla
                $('#detallesModal').modal('show');
            });
        },
    });
}

