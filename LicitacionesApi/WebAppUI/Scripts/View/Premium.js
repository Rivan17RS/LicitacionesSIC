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

var Suscripcion;
ObtenerSuscripcion(4)
var Premium = 4;
var Estado = 1;
var monto ;
var Descripcion;
function ObtenerSuscripcion(IdSuscrip) {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44369/api/Premium/ObtenerPremium/" + IdSuscrip,
        success: function (response) {
            console.log(response)
            Suscripcion = response;
            monto = Suscripcion.PrecioMensual;
            Descripcion = Suscripcion.Nombre;
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function pagarSubscripcion() {
    var body = {
        precio: monto,
        producto: Descripcion,
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


function RegistrarPago(IdUsuario,Monto,Estado,Descripcion) {
    var ps = {};
    ps.IdUsuario = IdUsuario;
    ps.Monto = Monto;
    ps.Estado = Estado;
    ps.Descripcion = Descripcion;
    ps.IdUsrCreacion = IdUsuario;

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        type: 'POST',
        url: "https://localhost:44369/api/PagosUsuario/CrearPagoUsuario",
        contentType: "application/json",
        data: JSON.stringify(ps),
        success: function (response) {
            console.log(response)
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}



function PagoRealizado() {
    actualizarRol(Identificacion, Premium);
    RegistrarPago(Id, monto,Estado, Descripcion);
}

