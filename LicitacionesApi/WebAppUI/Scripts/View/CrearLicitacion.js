function CrearLicitacion() {

    this.InitView = function () {
        $("btnCrearLicitacion").click(function () {
            var lic = new CrearLicitacion();
            lic.EnviarLicitacion();
        });
    }

    
    this.EnviarLicitacion = function () {
        var licitacion = {}
        licitacion.IdAnalista = $('#txtIdAnalista').val();
        licitacion.Titulo = $('#txtTitulo').val();
        licitacion.Descripcion = $('#txtDescripcion').val();
        licitacion.LugarEntrega = $('#txtLugarEntrega').val();
        licitacion.FechaCierreOfertas = $('#txtFechaCierreOfertas').val();
        licitacion.MontoPresupuestado = $('#txtMontoPresupuestado').val();

        var apiURL = app_api_url + "/api/Licitacion/CrearLicitacion";

        $.ajax({
            Headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: apiURL,
            contentType: "application/json",
            data: JSON.stringify(licitacion),
            hasContent: true
        }).done(function (apiResult) {
                if (apiResult.Result === "OK")
                    alert(apiResult.Message);
                else
                    alert("Fallo " + apiResult.Message);

        }).fail(function () {
                alert('Hubo un problema al crear la licitación');
             });

    }

    
}

$(document).ready(function () {
    var views = new CrearLicitacion();
    views.InitView();
})