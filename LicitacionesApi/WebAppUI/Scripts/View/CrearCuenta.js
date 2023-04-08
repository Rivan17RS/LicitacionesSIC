$(document).ready(function () {
    var userName = $("#userFirstName");
    var userLastName = $("#userSurnames");
    var userEmail = $("#userEmail");
    var userPhone = $("#userPhone");
    var userPass = $("#userPassword");
    var identificacion = $("#userID");

    var btnCreateAccount = $("#btnCreateAccount");

    btnCreateAccount.on("click", function () {
        console.log("User Name:", userName.val());
        console.log("User Last Name:", userLastName.val());
        console.log("User Email:", userEmail.val());
        console.log("User Phone:", userPhone.val());
        console.log("User Password:", userPass.val());
        console.log("User ID:", identificacion.val());
        var apiURL =
            "https://licitaciones-api.azurewebsites.net/api/Usuario/CrearUsuario";
        

        $.ajax({
            type: "POST",
            url: apiURL,
            data: {
                nombre: userName.val(),
                apellidos: userLastName.val(),
                correo: userEmail.val(),
                contrasena: userPass.val(),
                identificacion: identificacion.val(),
                telefono: userPhone.val(),
            },
            success: function (result) {
                // Show a success message
                alert("Your account has been created successfully!");
            },
            error: function (error) {
                // Show an error message
                console.log(error);
                alert(
                    "An error occurred while creating your account. Please try again later."
                );
            },
        });
    });
});