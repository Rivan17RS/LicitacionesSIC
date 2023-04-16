/**
 * Created by Zachary
 * Queda hacer ciertas mejoras de diseño, y abstracción.
 * Sin embargo, el sistema es muy escalable y fácil de mantener.
 * TODO:
 * 1. input password logic in input-logic.js for reusability.
 * 2. input regex verification abstraction layer (function of autofiller starts to look too long and convoluted)
 */

$(document).ready(function () {

    // toggle password setup
    showPassword = $("#show-password");
    hidePassword = $("#hide-password");
    showPassword.on("click", function() {
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

    // validaciones
    emptyValidationMessage = ".emptyValidationMessage";
    formatValidationMessage = ".formatValidationMessage";
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
                return (/^[0-9\s]+$/.test(text))
            },
            autofiller: function (text) {

                function autoFormatCedula(str) {
                    str = str.replace(/\s/g, '');

                    const firstDigit = str.charAt(0);
                    const sixthDigit = str.charAt(5);

                    let formattedCode = "";

                    if (str.length < 6) {
                        formattedCode = `${firstDigit} ` + str.substring(1, 6);
                    }

                    else {
                        formattedCode = `${firstDigit} ` + str.substring(1, 5) + ` ${sixthDigit}` + str.substring(6);
                    }

                    return formattedCode;
                }

                if (!(/^[0-9\s]+$/.test(text))) return text;

                if (text.length < 3) {
                    if (/^\d\s?$/.test(text)) {
                        return text;
                    }

                    else {
                        return autoFormatCedula(text);
                    }
                }

                else if (text.length >= 3 && text.length < 8) {
                    if (/\d\s(\d{1,4})?\s?$/.test(text)) {
                        return text;
                    }

                    else {
                        return autoFormatCedula(text);
                    }
                }

                else if (text.length >= 8 && text.length < 11) {

                    if (/^\d\s(\d{1,4})?\s(\d{1,4})?$/.test(text)) {
                        return text
                    }

                    else {
                        return autoFormatCedula(text);
                    }
                }

                if (text.length >= 11) {
                    return text.substring(0, 11);
                }
                // unformat code
            }
        },
        phone: {
            input: '#userPhone',
            validation: function (text) {
                return (/^\+?[0-9\-\s?]+$/.test(text))
            },
            autofiller: function (text) {

                if (text.substring(0, 4) === "+506" || text.substring(0, 4) === "+506") {

                    number_only = text.replace(/\D/g, "")
                    if (number_only.length >= 11) {
                        text = number_only.substring(3);
                    }

                    else {
                        return text;
                    }
                }
                8
                if (text.length === 8) {
                    return "+506-" + text.substring(0, 4) + "-" + text.substring(4, 9)
                }

                else if (text.length > 8) {
                    return "+506-" + text.substring(0, 4) + "-" + text.substring(4, 8)
                }

                else return text;
            }
        },
        email: {
            input: '#userEmail',
            validation: function (text) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(text);
            }
        },
        password: {
            input: "#userPassword",
            validation: function (text) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,21}$/.test(text);
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
})