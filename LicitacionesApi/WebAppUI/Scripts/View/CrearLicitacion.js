function CrearLicitacion() {

    this.InitView = function () {
        $("btnCrearLicitacion").on(function () {
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

var counter = 1;

$(document).ready(function () {
    var views = new CrearLicitacion();
    views.InitView();

    //Funcion para agregar bloques de codigo en el form de productos
    $(".agregar-producto").click(function () {
        var nuevoBloqueProducto = $(".bloque-producto:first").clone();
        nuevoBloqueProducto.find("input").val("");
        $(".col-producto").append(nuevoBloqueProducto);
        $(".bloque-producto:last").attr("id", "numprod-" + counter);
        counter++

    });

    //Funcion para borrar el bloque de codigo de un producto (hasta el card)
    $(document).on("click", ".remover-producto", function () {
        if ($(".bloque-producto").length > 1) {
            $(this).closest(".bloque-producto").remove();
        }
    });
});