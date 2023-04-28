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
                        '<button class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button>' +
                        '<button class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
                        '</div>'
                },
            className: 'premiumConfig',

        },

        $('#TblPremium').DataTable({
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
            })
  
    }


}

$(document).ready(function () {
    var view = new TablaPremium(); //Crea una instancia de la funcion principal
    view.InitView(); //Llama metodo inicializador de propiedades
});




