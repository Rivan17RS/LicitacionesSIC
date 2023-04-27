function Premium() {
    $.ajax({
        url: "https://licitaciones-api.azurewebsites.net/api/Premium/ObtenerTodosPremium",
        type: "GET",
        success: function (response) {
            if (response && response.length > 0) {
                var firstSubscription = response[0];
                var price = firstSubscription.PrecioMensual;
                console.log(price);
                $("#PrecioPremium").text('$'+price);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//variables globales

Premium();
var Suscripcion = localStorage.getItem('Suscripcion');
var TipoSuscripcion = localStorage.getItem('TipoSuscripcion');
var PremiumSubs = localStorage.getItem('PremiumSubs');
var Estado = localStorage.getItem('Estado');
var monto = localStorage.getItem('monto');;
var descripcion = localStorage.getItem('descripcion');;

function PremiumSuscripcion() {
    TipoSuscripcion = 4;
    PremiumSubs = 4;
    Estado = 1;


    Suscripcion = ObtenerSuscripcion(TipoSuscripcion);

    // Guardamos los valores en localStorage
    localStorage.setItem('Suscripcion', Suscripcion);
    localStorage.setItem('TipoSuscripcion', TipoSuscripcion);
    localStorage.setItem('PremiumSubs', PremiumSubs);
    localStorage.setItem('Estado', Estado);
 }


//metodo que obtiene los datos de la suscripción en la bd
function ObtenerSuscripcion(IdSuscrip) {
    var suscripcion;
    $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Premium/ObtenerPremium/" + IdSuscrip,
        async: false, // Hacemos la petición de manera síncrona para obtener el valor de retorno
        success: function (response) {
            console.log(response)
            suscripcion = response;
            monto = suscripcion.PrecioMensual;
            descripcion = suscripcion.Nombre;
            localStorage.setItem('monto', monto);
            localStorage.setItem('descripcion', descripcion);
            pagarSubscripcion(monto, descripcion)
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
    return suscripcion;
}


function pagarSubscripcion(pMonto,pDescripcion) {
    var body = {
        precio: pMonto,
        producto: pDescripcion,
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
        url: "https://licitaciones-api.azurewebsites.net/api/PagosUsuario/CrearPagoUsuario",
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
    actualizarRol(Identificacion, PremiumSubs);
    RegistrarPago(Id, monto, Estado, descripcion);
}
