$(document).ready(function () {
    // hide validations until user inputs data
    var validacionContrasena = $('#validacionContrasena').hide();
    var validacionContrasenaTwice = $('#validacionContrasenaTwice').hide();
    var validacionContrasenaSuccess = $('#validacionContrasenaSuccess').hide();

    var contrasena = $('#contrasenaInput');
    var contrasenaTwice = $('#contrasenaTwiceInput');
    var btnSubmit = $('#btnSubmit').addClass('disabled');

    // helper function to check if the passwords match
    function passwordsMatch() {
        return contrasena.val() === contrasenaTwice.val();
    }

    // helper function to check if the password is valid
    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,21}$/.test(password);
    }

    // handler for contrasenaTwice input
    contrasenaTwice.on('input', function () {
        if (contrasenaTwice.val() !== '' && passwordsMatch()) {
            validacionContrasenaTwice.hide();
            contrasenaTwice.addClass('is-valid').removeClass('is-invalid');
            if (isValidPassword(contrasena.val())) {
                btnSubmit.prop('disabled', false).removeClass('disabled');
            }
        } else {
            validacionContrasenaTwice.show();
            btnSubmit.prop('disabled', true).addClass('disabled');
            contrasenaTwice.addClass('is-invalid').removeClass('is-valid');
        }
    });

    // handler for contrasena input
    contrasena.on('input', function () {
        var password = contrasena.val();
        if (password !== '') {
            validacionContrasena.hide();

            if (isValidPassword(password)) {
                contrasena.addClass('is-valid').removeClass('is-invalid');

                validacionContrasenaSuccess.show();
                if (contrasenaTwice.val() !== '' && passwordsMatch()) {
                    contrasenaTwice.addClass('is-valid').removeClass('is-invalid');
                    validacionContrasenaTwice.hide();
                    btnSubmit.prop('disabled', false).removeClass('disabled');
                }

                else {
                    contrasenaTwice.addClass('is-invalid').removeClass('is-valid');
                    validacionContrasenaTwice.show();
                    btnSubmit.prop('disabled', true).addClass('disabled');
                }

            } else {
                contrasena.removeClass('is-valid').addClass('is-invalid');
                validacionContrasenaSuccess.hide();
                contrasenaTwice.addClass('is-invalid').removeClass('is-valid');
                btnSubmit.prop('disabled', true).addClass('disabled');

            }
        } else {
            validacionContrasena.show();
            validacionContrasenaSuccess.hide();
            contrasena.addClass('is-invalid').removeClass('is-valid');
            btnSubmit.prop('disabled', true).addClass('disabled');
        }
    });
});