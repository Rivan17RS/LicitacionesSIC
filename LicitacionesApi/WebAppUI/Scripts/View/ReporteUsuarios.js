function UsuariosTable() {
    this.InitView = function () {
        this.LoadUsuariosTable();
    }

    this.LoadUsuariosTable = function () {
        arrColumns = [
            { 'data': 'Nombre' },
            { 'data': 'Apellidos' },
            { 'data': 'Identificacion' },
            { 'data': 'Telefono' },
            { 'data': 'CorreoElectronico' },
            {
                'data': 'Estado',
                'render': function (data, type, full, meta) {
                    return data ? 'Activo' : 'Inactivo';
                }
            },
            {
                'data': 'Rol',
                'render': function (data, type, full, meta) {
                    switch (data) {
                        case 1:
                            return 'Admin';
                        case 2:
                            return 'Analista';
                        case 3:
                            return 'Usuario';
                        case 4:
                            return 'Premium';
                        default:
                            return '';
                    }
                }
            },
            {
                'data': 'Configuracion',
                'render': function (data, type, full, meta) {
                    return '<div class="text-center "><button id="btnConfig" class="btn btn-sm btn-outline-primary editar"  data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button></div>';
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
                type: "POST",
                url: "https://licitaciones-api.azurewebsites.net/api/Usuario/ObtenerUsuariosFiltro",
                contentType: "application/json",
                data: function (d) {
                    return JSON.stringify(getFiltros());
                },
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

    // Función para obtener los filtros de búsqueda
    function getFiltros() {
        var usr = {};
        usr.Nombre = $('#filtroNombre').val();
        usr.Apellidos = $('#filtroApellidos').val();
        usr.Identificacion = $('#filtroIdentificacion').val();
        usr.Telefono = $('#filtroTelefono').val();
        usr.CorreoElectronico = $('#filtroCorreo').val();
        usr.Estado = $('#filtroEstado').val();
        usr.Rol = $('#filtroRol').val();

        return usr;
    }

}


$(document).ready(function () {
    var view = new UsuariosTable();
    view.InitView();

    $('#btnBuscarUsr').on('click', function () {
        view.LoadUsuariosTable();
    });
});



$('#btnUserConfig').on('click', function () {
    var table = $('#tblUsuarios').DataTable();
    var visible = table.column('.userConfig').visible();
    table.column('.userConfig').visible(!visible);
});

$('#btnLimpiarUsr').on('click',function () {
    $("#filtroUsr")[0].reset();

})

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




