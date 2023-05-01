$(document).ready(function () {
    //Licitacion get info general
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Licitacion/ObtenerLicitacion/" + "4", //FORCED, TBR'd
        // Need to find a way to move idlicitacion into tempdata from licitacion to use it here for the url
        contentType: "application/json",
        success: function (data) {
            licitacion = data;

            var FechaCierreOfertas = licitacion.FechaCierreOfertas
            var FechaCierreOfertasCulled = new Date(FechaCierreOfertas).toLocaleDateString();
            
            $("#topInfo").html('<small class="text-muted mt-5">' + licitacion.Id + '</small><br /><span class="editable">' + licitacion.Titulo + '</span>');
            $("#estadoLicitacion").text(licitacion.Estado);
            $("#descripcionLicitacion").val(licitacion.Descripcion);
            $("#direccionLicitacion").text(licitacion.LugarEntrega);
            $("#expiracionLicitacion").text(FechaCierreOfertasCulled);
            if ($("#presupuestoLicitacion").val() != null) {
                $("#presupuestoLicitacion").text("CRC " + licitacion.MontoPresupuestado);
            }
        }
    });

    //Licitacion get info tabla

    //Oferta get info


});