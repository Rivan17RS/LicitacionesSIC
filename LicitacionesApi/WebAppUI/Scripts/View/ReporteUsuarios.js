function UsuariosTable() {
    this.InitView = function () {
        this.LoadUsuariosTable();
    }

    this.LoadUsuariosTable = function () {

        var arrColumns = [];
 

        // Verificar si la tabla ya existe, destruirla si es el caso.
        if ($.fn.DataTable.isDataTable('#tblUsuarios')) {
            $('#tblUsuarios').DataTable().destroy();
        }

        // Inicializar la tabla con la opción searching.
        $('#tblUsuarios').DataTable({
            searching: true,
            language: {
                search: "Filtrar por: _INPUT_",
            },
            ajax:
            {
                method: "GET",
                url: "https://licitaciones-api.azurewebsites.net/api/Usuario/ObtenerUsuarios",
                contentType: "application/json;charset=utf-8",
                dataSrc: function (json) {
                    console.log(json);
                    var jsonResult = { 'data': json };
                    console.log(jsonResult);
                    return jsonResult.data;
                }
            },
            columns: arrColumns
        });

        // Definir el evento click en cada fila de la tabla
        $('#tblUsuarios tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');
            var data = $('#tblUsuarios').DataTable().row(tr).data();

            var actionsC = new ActionsControl();
            actionsC.BindFields("frmUsuarios", data);
            $('#UsuarioForm').show();
        }).css('cursor', 'pointer').attr('title', 'Click para ver detalles');
    }

}


function actualizarRol(identificacion, rol) {
    $.ajax({
        method: "POST",
        url: "https://licitaciones-api.azurewebsites.net/api/Usuario/CambiarRol?Identificacion=" + identificacion + "&rol=" + rol,
        contentType: "application/json;charset=utf-8",
        dataSrc: function (json) {
            console.log(json);
            var jsonResult = { 'data': json };
            console.log(jsonResult);
            return jsonResult.data;
        }
    });
}

function actualizarEstado(identificacion) {
    $.ajax({
        method: "POST",
        url: "https://licitaciones-api.azurewebsites.net/api/Usuario/EstadoUsuario?Identificacion=" + identificacion,
        contentType: "application/json;charset=utf-8",
        dataSrc: function (json) {
            console.log(json);
            var jsonResult = { 'data': json };
            console.log(jsonResult);
            return jsonResult.data;
        }
    });
}

$('#frmUsuarios').on('click', '#btnCancelarUsuario', function () {
    $('#frmUsuarios')[0].reset();
    $('#UsuarioForm').hide();
});

$(document).ready(function () {
    var view = new UsuariosTable();

    view.InitView();

});