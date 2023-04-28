function PremiumView() {
    this.InitView = function () {
        this.MostrarPremium();
    }
    

    this.MostrarPremium() = function(){

        var arrColumns = [
            { "data": "Id" },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            { "data": "PrecioMensual" },
            { "data": "Estado" }
        ];

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
                type: "GET",
                url: "https://licitaciones-api.azurewebsites.net/api/Premium/ObtenerTodosPremium",
                contentType: "application/json",
                data: {},
                dataSrc: function (json) {
                    console.log(json);
                    var jsonResult = { 'data': json };
                    console.log(jsonResult);
                    return jsonResult.data;
                }
            },
            columns: arrColumns
        });
    }


}

$(document).ready(function () {
    var view = new PremiumView();
    view.InitView();

});

//function ActualizarPremium() {
//    var prod = {};
//    prod.Id = $('#txtIdProducto').val();
//    prod.Nombre = $('#NombreP').val();
//    prod.Descripcion = $('#txtDescripcion').val();
//    prod.PrecioMensual = $('#costoP').val();
//    prod.IdUsrActualizacion = 1;
//    if (confirm("¿Está seguro que desea actualizar la membresía?")) {
//        $.ajax({
//            headers: {
//                'Accept': "application/json",
//                'Content-Type': "application/json"
//            },
//            type: 'POST',
//            url: "",
//            contentType: "application/json",
//            data: JSON.stringify(prod),
//            success: function () {
//                MostrarPremium();
//                alert('Producto actualizado correctamente');
//            },
//            error: function (xhr, status, error) {
//                console.log(error);
//                alert('Error, no se pudo actualizar');

//            }
//        });
//    }
//}




//$(document).ready(function () {
    
   
//})


