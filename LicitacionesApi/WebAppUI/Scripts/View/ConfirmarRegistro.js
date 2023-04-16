$(document).ready(function () {

    // toggle password setup

    showPassword = $("#show-password");
    hidePassword = $("#hide-password");
    showPassword.on("click", function () {
        // show password
        $("#userPassword input").attr("type", "text");
        $(this).addClass("d-none");
        hidePassword.removeClass("d-none");
    })

    hidePassword.on("click", function () {
        // hide password
        $("#userPassword input").attr("type", "password");
        $(this).addClass("d-none");
        showPassword.removeClass("d-none");
    })

    emptyValidationMessage = ".emptyValidationMessage";
    formatValidationMessage = ".formatValidationMessage";

    inputTextbox = {
        identificationNumberInput: {
            input: "#identificationNumberInput",
            validation: function (text) {
                return (/^[0-9\s]+$/.test(text))
            }
        },

        otpInput: {
            input: "#otpInput",
            validation: function (text) {
                return (text.length < 20);
            }
        }
    }


    for (input in inputTextbox) {
        let formInput = inputTextbox[input]
        let isValidTextFunction = formInput.validation;
        let autofillerFunction = formInput.autofiller;


        $(`${formInput.input} ${formatValidationMessage}`).addClass("d-none");
        $(`${formInput.input} ${emptyValidationMessage}`).addClass("d-none");

        $(`${formInput.input} input`).on("input", function () {

            let formValue = $(this).val();

            /**
             * Aquí comienza la validación para cada uno de los inputs.
             * 
             * First: Is string empty for every textbox?
             */
            if (formValue !== "") {
                $(`${formInput.input} ${emptyValidationMessage}`).addClass('d-none');

                // Second: validation for specific textboxes

                if (isValidTextFunction(formValue)) {
                    $(`${formInput.input} ${formatValidationMessage}`).addClass('d-none');
                }

                else {
                    $(`${formInput.input} ${formatValidationMessage}`).removeClass('d-none');
                }

                if (autofillerFunction !== undefined) {
                    $(`${formInput.input} input`).val(autofillerFunction(formValue));
                }
            }

            else {
                $(`${formInput.input} ${emptyValidationMessage}`).removeClass('d-none');
                $(`${formInput.input} ${formatValidationMessage}`).addClass('d-none');
            }
        });
    }
});
