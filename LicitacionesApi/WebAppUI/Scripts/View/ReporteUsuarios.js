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
        arrColumns[7] = {
            'data': 'Configuracion',
            'render': function (data, type, full, meta) {
                return '<div class="text-center"><button id="btnConfig" class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Configurar"><i class="fas fa-cog"></i></button></div>';
            }
        };


 

        // Verificar si la tabla ya existe, destruirla si es el caso.
        if ($.fn.DataTable.isDataTable('#tblUsuarios')) {
            $('#tblUsuarios').DataTable().destroy();
        }

        // Inicializar la tabla con la opción searching.
        $('#tblUsuarios').DataTable({
            searching: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
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
        $('#tblUsuarios tbody').on('click', '#btnConfig', function () {
            var tr = $(this).closest('tr');
            var data = $('#tblUsuarios').DataTable().row(tr).data();

            var actionsC = new ActionsControl();
            actionsC.BindFields("frmUsuarios", data);
            $('#usuarioModal').modal('show');
        });
    }

}



$('#frmUsuarios').on('submit', function (e) {
    e.preventDefault();
    var identificacion = $('#txtIdentificacion').val();
    var rol = $('#ddlRol').val();
    actualizarRol(identificacion, rol);
    $('#usuarioModal').modal('hide');
});







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
    location.reload()
}

function actualizarEstado(identificacion) {
    $.ajax({
        method: "POST",
        url: "https://licitaciones-api.azurewebsites.net/api/Usuario/EstadoUsuario?Identificacion=" + identificacion,
        contentType: "application/json;charset=utf-8",
        dataSrc: function (json) {
            console.log(json);
            var jsonResult = { 'data': json };
            return jsonResult.data;
        }
    });
    location.reload();
}

$('#frmUsuarios').on('click', '#btnCancelarUsuario', function () {
    $('#frmUsuarios')[0].reset();
    $('#UsuarioForm').hide();
});

$(document).ready(function () {
    var view = new UsuariosTable();

    view.InitView();

});