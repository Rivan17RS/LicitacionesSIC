$(document).ready(function () {

    // hide validations until user inputs data
    validacionContrasena = $('#validacionContrasena');
    validacionCorreoElectronico = $('#validacionCorreoElectronico');
    validacionContrasena.hide();
    validacionCorreoElectronico.hide();


    $('#correoElectronicoInput').on('input', function () {
        var correoElectronico = $(this).val();
        var validacionCorreoElectronico = $('#validacionCorreoElectronico');
        var submitButton = $('#btnLogin');

        if (correoElectronico !== '') {
            validacionCorreoElectronico.hide()
            submitButton.prop('disabled', false);
            submitButton.removeClass('disabled');
        } else {
            validacionCorreoElectronico.show();

            submitButton.prop('disabled', true);
            submitButton.addClass('disabled');
        }
    });
});