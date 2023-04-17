$(document).ready(function () {

    // toggle password setup
    showPassword = $("#show-password");
    hidePassword = $("#hide-password");
    showPassword.on("click", function () {
        // show password
        $("#contrasenaInput").attr("type", "text");
        $(this).addClass("d-none");
        hidePassword.removeClass("d-none");
    })

    hidePassword.on("click", function () {
        // hide password
        $("#contrasenaInput").attr("type", "password");
        $(this).addClass("d-none");
        showPassword.removeClass("d-none");
    })

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