$(document).ready(function () {
    return $.ajax({
        type: 'GET',
        url: "https://licitaciones-api.azurewebsites.net/api/Licitacion/ObtenerLicitaciones/",
        contentType: "application/json",
        success: function (data) {
            licitaciones = data;
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                $('#licitacion-dock').append('<div class="card m-2 licitation-card"><div class="card-body"><h4 class="card-title text-truncate">' + value.Titulo + '</h4><h6 class="card-subtitle mb-2 text-muted">' + value.Id + '</h6><p class="card-text text-truncate">' + value.Descripcion + '</p></div><div class="card-footer row justify-content-between pb-6"><div class="col-3"><span class="badge rounded-pill bg-info">' + value.Estado + '</span></div><div class="col-8 text-end"><a onclick="assignIdToTempData(' + value.id + ')" href=\"/Licitacion/AbrirLicitacion" class=\"card-link\">Ver Licitaci&oacuten</a></div></div>');
            }
        }
    });
});

/*
function assignIdToTempData(id) {
    $.ajax({
        type: "POST",
        url: "/ControllerName/ActionName",
        data: { 'tempDataValue': tempDataValue },
        success: function (data) {
        }
    });
}
*/