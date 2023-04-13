function UsuariosTable() {
    this.InitView = function () {
        this.LoadUsuariosTable();
    }

    this.LoadUsuariosTable = function () {
        var usr = {};
        usr.Nombre = $('filtroNombre').val();
        usr.Apellidos = $('filtroApellidos').val();
        usr.Identificacion = $('filtroIdentificacion').val();
        usr.Telefono = $('filtroTelefono').val();
        usr.CorreoElectronico = $('filtroCorreo').val();
        usr.Estado = $('filtroEstado').val();
        usr.IdRol = $('filtroRol').val();


        var arrColumns = [
            { 'data': 'Nombre' },
            { 'data': 'Apellidos' },
            { 'data': 'Identificacion' },
            { 'data': 'Telefono' },
            { 'data': 'CorreoElectronico' },
            {
                'data': 'Estado',
                'render': function (data, type, full, meta) {
                    if (data) {
                        return 'Activo';
                    } else {
                        return 'Inactivo';
                    }
                }
            },
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
            },
            {
                'data': 'Configuracion',
                'render': function (data, type, full, meta) {
                    return '<div class="text-center "><button id="btnConfig" class="btn btn-sm btn-primary editar"  data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button></div>';
                },
                className: 'userConfig',
                visible: false
            }
        ];

        if ($.fn.DataTable.isDataTable('#tblUsuarios')) {
            $('#tblUsuarios').DataTable().destroy();
        }

        var tablaUsuarios = $('#tblUsuarios').DataTable({
            searching: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
            },
            ajax: {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                    },
                method: "GET",
                url: "https://licitaciones-api.azurewebsites.net/api/Usuario/ObtenerUsuariosFiltro",
                contentType: "application/json",
                data: JSON.stringify(usr),
                hasContent: true,
                dataSrc: function (json) {
                    console.log(json);
                    var jsonResult = { 'data': json };
                    console.log(jsonResult);
                    return jsonResult.data;
                }
            },
            columns: arrColumns
        });

        $('#tblUsuarios tbody').off('click', '#btnConfig').on('click', '#btnConfig', function () {
            var tr = $(this).closest('tr');
            var data = tablaUsuarios.row(tr).data();

            var actionsC = new ActionsControl();
            actionsC.BindFields("frmUsuarios", data);
            $('#usuarioModal').modal('show');
        });
    }

}


$(document).ready(function () {
    var view = new UsuariosTable();
    view.InitView();

});

$('#btnBuscarUsr').on('click', function () {
    LoadUsuariosTable();
})


$('#btnUserConfig').on('click', function () {
    var table = $('#tblUsuarios').DataTable();
    var visible = table.column('.userConfig').visible();
    table.column('.userConfig').visible(!visible);
});



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




