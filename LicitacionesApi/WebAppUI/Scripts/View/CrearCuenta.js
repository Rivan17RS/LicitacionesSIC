$(document).ready(function() {
    var userName = $("#userFirstName");
    var userLastName = $("#userSurnames");
    var userEmail = $("#userEmail");
    var userPhone = $("#userPhone");
    var userPass = $("#userPassword");
    var identificacion = $("#userID");

    btnCreateAccount = $("#btnCreateAccount");

    btnCreateAccount.on("click", function () {
        apiURL = "https://licitaciones-api.azurewebsites.net/api/Usuario/CrearUsuario?nombre=" + userName + "&apellidos=" + userLastName + "&identificacion=" + userID + "&telefono=" + userPhone + "&correo=" + userEmail + "&contrasena=" + userPass;

        $.ajax({
            type: "POST",
            url: "https://licitaciones-api.azurewebsites.net/api/Usuario/CrearUsuario",
            data: {
                nombre: userName.val(),
                apellidos: userLastName.val(),
                correo: userEmail.val(),
                contrasena: userPass.val(),
                identificacion: identificacion.val(),
                telefono: userPhone.val()
            },
            success: function (result) {
                // Show a success message
                alert("Your account has been created successfully!");
            },
            error: function (xhr, status, error) {
                // Show an error message
                console.log(error);
                alert("An error occurred while creating your account. Please try again later.");
            }
        });
    })
})