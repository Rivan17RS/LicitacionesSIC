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



   
        //To be reviewed

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
                                '<button class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button>' +
                                '<button class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
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
    })




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
                alert('Plan actualizado correctamente');
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
    ap.IdUsrActualizacion = 41;
    if (confirm("¿Está seguro que desea actualizar este plan?")) {
        $.ajax({
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Premium/ActualizarPremium",
            contentType: "application/json",
            data: JSON.stringify(ap),
            success: function (response) {
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
                alert('Plan eliminado');
            }
        });
    }
}



$(document).ready(function () {
 

    var view = new TablaPremium();
    view.InitView();

});
