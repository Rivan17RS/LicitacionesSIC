$(document).ready(function () {

    $('#contrasenaTwiceInput').on('input', function () {
        var contrasena = $('#contrasenaInput').val();
        var contrasenaTwice = $(this).val();
        var contrasenaMismatchError = $('#validacionContrasenaTwice');

        console.log("processing");
        var submitButton = $('#btnLogin');

        if (contrasena !== '' && contrasena !== contrasenaTwice) {
            contrasenaMismatchError.show();
            submitButton.prop('disabled', true);
        } else {
            contrasenaMismatchError.hide();
            submitButton.prop('disabled', false);
        }
    });

    $('#contrasenaInput').on('input', function () {
        var contrasena = $(this).val();
        var contrasenaTwice = $('#contrasenaTwiceInput').val();
        var contrasenaMismatchError = $('#contrasenaMismatchError');
        var submitButton = $('#btnLogin');

        if (contrasenaTwice !== '' || contrasena !== contrasenaTwice) {
            contrasenaMismatchError.show();
            submitButton.prop('disabled', true);
        } else {
            contrasenaMismatchError.hide();
            submitButton.prop('disabled', false);
        }
    });

    $("#btnLogin").on("click", function () {
        var contrasena = $('#contrasenaInput').val();

        contrasenaFormatError = $('#contrasenaFormatError');
        submitButton = $('#btnLogin');

        if (contrasena == '' || !contrasena.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,21}$/)) {
            event.preventDefault();
            contrasenaFormatError.show();


        } else {
            contrasenaFormatError.hide();
        }
    });
});