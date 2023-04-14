/**
 * Created by Zachary
 * Believe or not, este código fue diseño por mi. Con ayuda de la investigación de los principios de programacíón funcional en Javascript.
 * Queda hacer ciertas mejoras de diseño, y abstracción.
 * Sin embargo, el sistema es muy escalable y fácil de mantener.
 */

$(document).ready(function () {

    emptyValidationMessage = ".emptyValidationMessage";
    formatValidationMessage = ".formatValidationMessage"
    inputTextbox = {
        firstName: {
            input: '#userFirstName',
            validation: function (text) {
                // 3 validations:
                // 1. Contains letter only, spanish valid characters, and in between whitespaces?
                // 2. Not contains traling whitespaces?
                // 3. Not contains leading whitespaces?
                return (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/.test(text) && (text.length === text.trimEnd().length) && (text.length === text.trimStart().length))
            }
        },
        surNames: {
            input: "#userSurnames",
            validation: function (text) {
                // 3 validations:
                // 1. Contains letter only, spanish valid characters, and in between whitespaces?
                // 2. Not contains traling whitespaces?
                // 3. Not contains leading whitespaces?
                return (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/.test(text) && (text.length === text.trimEnd().length) && (text.length === text.trimStart().length))
            }
        },
        id: {
            input: '#userID',
            validation: function (text) {
                return (/^[0-9]+$/.test(text))
            },
            autofiller: function (text) {

                // unformat code
                text = text.replace(/-/g, '');

                if (text.length < 2) return text;
                const firstDigit = text.charAt(0);
                const sixthDigit = text.charAt(4);

                let formattedCode = "";

                if (text.length < 7) {
                    formattedCode = `${firstDigit}-` + text.substring(1, 5) + `${sixthDigit}`;
                }

                else {
                    formattedCode = `${firstDigit}-` + text.substring(1, 5) + `${sixthDigit}-` + text.substring(6);
                }

                return formattedCode;
            }
        },
        phone: {
            input: '#userPhone'
        },
        email: {
            input: '#userEmail'
        },
        password: {
            input: "#userPassword"
        }
    }

    for (input in inputTextbox) {
        let formInput = inputTextbox[input]
        let isValidTextFunction = formInput.validation;
        let autofillerFunction = formInput.autofiller;


        $(`${formInput.input} ${formatValidationMessage}`).addClass("d-none");
        $(`${formInput.input} ${emptyValidationMessage}`).addClass("d-none");

        $(`${formInput.input} input`).on("input", function () {

            console.log(formInput.input);
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
                    console.log(autofillerFunction(formValue))
                    $(`${formInput.input} input`).val(autofillerFunction(formValue));
                }
            }

            else {
                $(`${formInput.input} ${emptyValidationMessage}`).removeClass('d-none');
                $(`${formInput.input} ${formatValidationMessage}`).addClass('d-none');
            }
        });
    }
})