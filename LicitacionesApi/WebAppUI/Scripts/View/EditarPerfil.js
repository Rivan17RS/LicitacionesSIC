$(document).ready( function () {
    uNombre = $("#uName");
    uLastName = $("#uSurnames");
    uEmail = $("#uEmail");
    uPhone = $("#uPhone");

    uNombre.val(UserName);
    console.log(UserName);
    uLastName.val(UserLastName);
    uEmail.val(UserEmail);
    uPhone.val(UserPhone);
})


function EditarPerfil() {

        console.log("corre")
        var nombre = $("#uName").val();
        var Apellidos = $("#uSurnames").val();
        var Identificacion = UserID;
        var Telefono = $("#uPhone").val();
        var CorreoElectronico = $("#uEmail").val();

        var contrasenanueva = $("#contrasenaInput").val();
        var Otp = UserOtp;

        var Contrasena = UserPass;
        if (contrasenanueva === undefined || contrasenanueva === "") {
            Contrasena = UserPass;
        }

        else {
            Contrasena = $("#contrasenaInput").val();
        }

    var apiURL = "https://licitaciones-api.azurewebsites.net/api/Usuario/ActualizarUsuario?nombre=" + nombre + "&apellidos=" + Apellidos + "&identificacion=" + Identificacion + "&telefono=" + Telefono + "&correo=" + CorreoElectronico + "&contrasena=" + UserPass + "&Otp=" + Otp;

        $.ajax({
            method: "POST",
            url: apiURL,
            contentType: "application/json;charset=utf-8",
            data: {},
            success: function (json) {
                console.log(json);
            }
        });

        var apiURL = "https://licitaciones-api.azurewebsites.net/api/Usuario/cambiarContrasena?correo=" + CorreoElectronico + "&contrasenanueva=" + Contrasena;

        $.ajax({
            method: "POST",
            url: apiURL,
            contentType: "application/json;charset=utf-8",
            data: {},
            success: function (json) {
                console.log(json);
            }
        });

 }


