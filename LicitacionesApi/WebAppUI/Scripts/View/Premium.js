function Premium() {

    this.InitView = function () {
        $('#updatePremium').click(function () {
            var pm = new Premium();
            pm.PagoPremium();
        });
    }

    this.PagoPremium = function () {
        var payPal = new this.PagoPremium();
    }

}




function pagarSubscripcion() {
    var body = {
        //precio: $("#precio").val(),
        precio: 5.00,
        producto: "Suscripción premium"
    }
    jQuery.ajax({
        url: '/Paypal/Paypal',
        type: "POST",
        data: JSON.stringify(body),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data.status) {
                var jsonresult = JSON.parse(data.respuesta);
                console.log(jsonresult);
                var links = jsonresult.links;
                var resultado = links.find(item => item.rel === "approve")
                window.location.href = resultado.href
            } else {
                alert("Vuelva a intentarlo más tarde")
            }
        }
    });
}



function actualizarRol(identificacion, rol) {
    $.ajax({
        method: "POST",
        url: "https://licitaciones-api.azurewebsites.net/api/Usuario/CambiarRol?Identificacion=" + identificacion + "&rol=" + rol,
        success: function (response) {
            console.log('Usuario actualizado correctamente');
        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log('Error, no se pudo actualizar');
        }
    });
}






