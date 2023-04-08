$(document).ready(function () {
    $("#btn-confirmar-registro").on("click", function () {
        var identificationNumber = $("#identificationNumberInput").val();
        var otp = $("#otpInput").val();

        var apiURL = "https://licitaciones-api.azurewebsites.net/api/Usuario/ValidarOtp?identificacion=" + identificationNumber + "&otp=" + otp;
        $.ajax({
            method: "POST",
            url: apiURL,
            contentType: "application/json;charset=utf-8",
            data: {},
            success: function (json) {
                console.log(json);
            }
        });
    });
});
