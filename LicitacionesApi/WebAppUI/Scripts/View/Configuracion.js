function TablaPremium() {

    this.InitView = function () {
        this.LoadAllPremium();
    }

    this.LoadAllPremium = function () {
            var arrayColumns = [];
            arrayColumns[0] = { 'data': 'Id' };
            arrayColumns[1] = { 'data': 'Nombre' };
            arrayColumns[2] = { 'data': 'Descripcion' };
            arrayColumns[3] = { 'data': 'PrecioMensual' };
            arrayColumns[4] = { 'data': 'Estado' };
            arrayColumns[5] = {
                'data': 'Configuracion',
                    'render': function (data, type, full, meta) {
                        return '<div class="btn-group" role="group">' +
                            '<button type="button" class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button>' +
                            '<button type="button" class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
                            '</div>'
                    },

            },

        PremiumCargada = $('#TblPremium').DataTable({
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
            },
            ajax: {
                method: "GET",
                url: "https://licitaciones-api.azurewebsites.net/api/Premium/ObtenerTodosPremium",
                contentType: "application/json;charset=utf-8",
                dataSrc: function (json) {
                    var jsonResult = { 'data': json };
                    return jsonResult.data;

                }
            },
            columns: arrayColumns
        });


        $('#btnCrearPremium').on('click', function () {
            $('#frmPremiumModal')[0].reset();
            $('#frmPremiumModal #IdPremium').hide();
   
            $('#btnGuardarPremium').off('click').on('click', function () {
                CrearPremium();
            });
            $('#premiumModal').modal('show');
        });
    

        $('#TblPremium tbody').on('click', 'tr .editar', function () {
            $('#frmPremiumModal')[0].reset();
            var tr = $(this).closest('tr');
            var data = PremiumCargada.row(tr).data();
            $('#txtIdPremium').val(data.Id);
            $('#txtNombreP').val(data.Nombre);
            $('#txtDescripcionP').val(data.Descripcion);
            $('#txtPrecioP').val(data.PrecioMensual);
            $('#txtEstadoP').val(data.Estado);
            $('#frmPremiumModal #IdPremium').show();
            $('#premiumModal').modal('show');
            $('#btnGuardarPremium').off('click').on('click', function () {
               ActualizarPremium();
            });
        });

        $('#TblPremium tbody').on('click', 'tr .eliminar', function () {
            var tr = $(this).closest('tr');
            var data = PremiumCargada.row(tr).data();
            var premiumId = data.Id;
            EliminarPremium(premiumId);

        }).css('cursor', 'pointer');


        TablaRoles();

    }
}




function TablaRoles() {

    
        var arrayColumns = [];
        arrayColumns[0] = { 'data': 'Id' };
        arrayColumns[1] = { 'data': 'Nombre' };
        arrayColumns[2] = { 'data': 'Estado' };
        arrayColumns[3] = {
            'data': 'Configuracion',
            'render': function (data, type, full, meta) {
                return '<div class="btn-group" role="group">' +
                    '<button type="button" class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button type="button" class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
                    '</div>'
            },

        },


        RolesCargado = $('#TblRoles').DataTable({
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
            },
            ajax: {
                method: "GET",
                url: "https://licitaciones-api.azurewebsites.net/api/Role/ObtenerRoles",
                contentType: "application/json;charset=utf-8",
                dataSrc: function (json) {
                    var jsonResult = { 'data': json };
                    return jsonResult.data;
                }
            },
            columns: arrayColumns

        });

        $('#btnCrearRole').on('click', function () {
            $('#frmRolModal')[0].reset();
            $('#frmRolModal #IdRol').hide();
            $('#btnGuardarRol').off('click').on('click', function () {
                CrearRol();
            });
            $('#RolModal').modal('show');
        });

        $('#TblRoles tbody').on('click', 'tr .editar', function () {
            $('#frmRolModal')[0].reset();
            var tr = $(this).closest('tr');
            var data = RolesCargado.row(tr).data();
            $('#txtIdRol').val(data.Id);
            $('#txtNombreR').val(data.Nombre);
            $('#txtEstadoR').val(data.Estado);
            $('#frmRolModal #IdRol').show();
            $('#RolModal').modal('show');
            $('#btnGuardarRol').off('click').on('click', function () {
                ActualizarRol();
            });
        });

        $('#TblRoles tbody').on('click', 'tr .eliminar', function () {
            var tr = $(this).closest('tr');
            var data = RolesCargado.row(tr).data();
            var RolId = data.Id;
            EliminarRol(RolId);

        }).css('cursor', 'pointer');


}



function CrearPremium() {
    var ap = {};
    ap.Nombre = $('#txtNombreP').val();
    ap.Descripcion = $('#txtDescripcionP').val();
    ap.PrecioMensual = $('#txtPrecioP').val();
    ap.Estado = $('#txtEstadoP').val()
    ap.IdUsrCreacion = 4;
    if (confirm("¿Está seguro que desea crear este plan?")) {
        $.ajax({
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Premium/CrearPremium",
            contentType: "application/json",
            data: JSON.stringify(ap),
            success: function (response) {
                location.reload();
                alert('Plan creado exitosamente');
            },
            error: function (xhr, status, error) {
                console.log(error);
                alert('Error, no se pudo crear');

            }
        });
    }
}



function ActualizarPremium() {
    var ap = {};
    ap.Id = $('#txtIdPremium').val();
    ap.Nombre = $('#txtNombreP').val();
    ap.Descripcion = $('#txtDescripcionP').val();
    ap.PrecioMensual = $('#txtPrecioP').val();
    ap.Estado = $('#txtEstadoP').val()
    ap.IdUsrActualizacion = parseInt(IdUserSession);
    if (confirm("¿Está seguro que desea actualizar este plan?")) {
        $.ajax({
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Premium/ActualizarPremium",
            contentType: "application/json",
            data: JSON.stringify(ap),
            success: function (response) {
                location.reload();
                alert('Plan actualizado correctamente');
            },
            error: function (xhr, status, error) {
                console.log(error);
                alert('Error, no se pudo actualizar');
            }
        });
    }
}


function EliminarPremium(Id) {
    if (confirm("¿Está seguro que desea eliminar este plan?")) {
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Premium/EliminarPremium/" + Id,
            success: function (response) {
                location.reload();
                alert('Plan eliminado');
            }
        });
    }
}




function CrearRol() {
    var cr = {};
    cr.Id = $('#txtIdRol').val();
    cr.Nombre = $('#txtNombreR').val();
    cr.Estado = $('#txtEstadoR').val();
    cr.IdUsrCreacion = parseInt(IdUserSession);
    if (confirm("¿Está seguro que desea crear este Rol?")) {
        $.ajax({
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Role/CrearRole",
            contentType: "application/json",
            data: JSON.stringify(cr),
            success: function (response) {
                location.reload();
                alert('Rol creado exitosamente');
            },
            error: function (xhr, status, error) {
                console.log(error);
                alert('Error, no se pudo crear');

            }
        });
    }
}


function ActualizarRol() {
    var cr = {};
    cr.Id = $('#txtIdRol').val();
    cr.Nombre = $('#txtNombreR').val();
    cr.Estado = $('#txtEstadoR').val();
    cr.IdUsrCreacion = 15;
    if (confirm("¿Está seguro que desea actualizar el Rol?")) {
        $.ajax({
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Role/ActualizarRole",
            contentType: "application/json",
            data: JSON.stringify(cr),
            success: function (response) {
                location.reload();
                alert('Rol actualizado correctamente');
            },
            error: function (xhr, status, error) {
                console.log(error);
                alert('Error, no se pudo crear');

            }
        });
    }
}



function EliminarRol(Id) {
    if (confirm("¿Está seguro que desea eliminar el rol?")) {
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Role/EliminarRole/" + Id,
            success: function (response) {
                location.reload();
                alert('Rol eliminado');
            }
        });
    }
}


$(document).ready(function () {

    var view = new TablaPremium();
    view.InitView();

});
