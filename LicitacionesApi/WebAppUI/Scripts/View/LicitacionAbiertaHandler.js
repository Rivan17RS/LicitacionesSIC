$(document).ready(function () {
    // Obtener el valor del parámetro idLicitacion de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idLicitacion = urlParams.get('idLicitacion');
    CargarLicitacion(idLicitacion);
});



function CargarLicitacion(IdLic) {
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Licitacion/ObtenerLicitacion/" + IdLic, //FORCED, TBR'd
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
            CargarProductosLicitaciones(IdLic)
        },
    });
}

//Licitacion get info tabla
function CargarProductosLicitaciones(IdLic) {

}
    //Oferta get info