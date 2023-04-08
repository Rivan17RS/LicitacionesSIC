
function EditarPerfil() {

        var nombre = UserName;
        var Apellidos = UserLastName;
        var Identificacion = UserID;
        var Telefono = UserPhone;
        var CorreoElectronico = UserEmail;
        var Contrasena = UserPass;
        var Otp = UserOtp;

        var apiURL = "https://localhost:44369/api/Usuario/ActualizarUsuario?nombre=" + nombre + "&apellidos=" + Apellidos + "&identificacion=" + Identificacion + "&telefono=" + Telefono + "&correo=" + CorreoElectronico + "&contrasena=" + Contrasena + "&Otp=" + Otp;

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


