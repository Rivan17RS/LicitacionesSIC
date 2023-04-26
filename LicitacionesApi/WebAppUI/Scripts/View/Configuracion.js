
function MostrarPremium() {

    arrColumns = [
        { 'data': 'Id' },
        { 'data': 'Nombre' },
        { 'data': 'Descripcion' },
        { 'data': 'PrecioMensual' },
        {
            'render': function (data, type, full, meta) {
                return data;
            },
            className: 'premiumConfig',

        },

    ];
    arrColumns[4];

    var tablaPremium = $('#TblPremium').DataTable({
        searching: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
        },
        ajax: {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Premium/ObtenerPremium",
            contentType: "application/json",
            data: function () {
                return JSON.stringify();
            },
            dataSrc: function (json) {
                var jsonResult = { 'data': json };
                return jsonResult.data;

            }
        },
        columns: arrColumns,
    });


    $('#TblPremium tbody').on('click', 'tr .editar', function () {
        $('#frmPremium')[0].reset();
        var tr = $(this).closest('tr');
        var data = tablaPremium.row(tr).data();
        $('#NombreP').val(data.Nombre);
        $('#costoP').val(data.PrecioMensual);
        $('#descripcionP').val(data.Descripcion);
        $('#btnPremium').off('click').on('click', function () {
            ActualizarPremium();
        });
    });



}



function ActualizarPremium() {
    var prod = {};
    prod.Id = $('#txtIdProducto').val();
    prod.Nombre = $('#NombreP').val();
    prod.Descripcion = $('#txtDescripcion').val();
    prod.PrecioMensual = $('#costoP').val();
    prod.IdUsrActualizacion = 1;
    if (confirm("¿Está seguro que desea actualizar la membresía?")) {
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            type: 'POST',
            url: "",
            contentType: "application/json",
            data: JSON.stringify(prod),
            success: function () {
                MostrarPremium();
                alert('Producto actualizado correctamente');
            },
            error: function (xhr, status, error) {
                console.log(error);
                alert('Error, no se pudo actualizar');

            }
        });
    }
}




//$(document).ready(function () {
    
   
//})


