$(document).ready(function () {

    // hide validations until user inputs data
    validacionContrasena = $('#validacionContrasena');
    validacionCorreoElectronico = $('#validacionCorreoElectronico');
    validacionContrasena.hide();
    validacionCorreoElectronico.hide();
    iniciarSesionButton = $('#btn-login');
    iniciarSesionButton.addClass("disabled");


    $('#correoElectronicoInput').on('input', function () {
        var contrasena = $('#contrasenaInput').val();
        var correoElectronico = $(this).val();
        var validacionCorreoElectronico = $('#validacionCorreoElectronico');
        var submitButton = $('#btn-login');

        if (correoElectronico !== '') {
            validacionCorreoElectronico.hide();
            if (contrasena !== '') {
                submitButton.prop('disabled', false);
                submitButton.removeClass('disabled');
            }

        } else {
            validacionCorreoElectronico.show();
            if (contrasena === '') {
                submitButton.prop('disabled', true);
                submitButton.removeClass('disabled');
            }

            submitButton.addClass("disabled");
        }
    });
    $('#contrasenaInput').on('input', function () {
        var contrasena = $(this).val();
        var correoElectronico = $('#correoElectronicoInput').val();
        var validacionContrasena = $('#validacionContrasena');
        var submitButton = $('#btn-login');

        if (contrasena !== '') {
            validacionContrasena.hide();
            if (correoElectronico !== '') {
                submitButton.prop('disabled', false);
                submitButton.removeClass('disabled');
            }

            else {
                submitButton.prop('disabled', false);
                submitButton.addClass('disabled');
            }
        } else {
            validacionContrasena.show();
            submitButton.addClass("disabled");
        }

    });
});