function UsuariosTable() {
    this.InitView = function () {
        this.LoadUsuariosTable();
    }

    this.LoadUsuariosTable = function () {


        var arrColumns = [];
        arrColumns[0] = { 'data': 'Nombre' }
        arrColumns[1] = { 'data': 'Apellidos' }
        arrColumns[2] = { 'data': 'Identificacion' }
        arrColumns[3] = { 'data': 'Telefono' }
        arrColumns[4] = { 'data': 'CorreoElectronico' }
        arrColumns[5] = {
            'data': 'Estado',
            'render': function (data, type, full, meta) {
                if (data) {
                    return 'Activo';
                } else {
                    return 'Inactivo';
                }
            }
        }
        arrColumns[6] =
        {
            'data': 'Rol',
            'render': function (data, type, full, meta) {
                if (data == 1) {
                    return 'Admin';
                } else if (data == 2) {
                    return 'Analista';
                } else if (data == 3) {
                    return 'Usuario';
                } else if (data == 4) {
                    return 'Premium';
                } else {
                    return '';
                }
            }
        }

        if ($.fn.DataTable.isDataTable('#tblUsuarios')) {
            $('#tblUsuarios').DataTable().destroy();
        }

        $('#tblUsuarios').DataTable({

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

        })

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