function Licitaciones() {

    this.InitView = function () {

        $("#btnCrearLicitacion").click(function () {
            var lic = new Licitaciones();
            lic.IrCrearLicitacion();
        });

        this.LoadLicitacionesTable();
    }

    this.IrCrearLicitacion = function () {
        location.href = "../Views/Licitacion/CrearLicitaciones";

    }


    this.LoadLicitacionesTable = function () {
        var arrayColumns = [];
        arrayColumns[0] = { 'data': 'IdAnalista' };
        arrayColumns[1] = { 'data': 'Titulo' };
        arrayColumns[2] = { 'data': 'Descripcion' };
        arrayColumns[3] = { 'data': 'LugarEntrega' };
        arrayColumns[4] = { 'data': 'FechaCierreOfertas' };
        arrayColumns[5] = { 'data': 'MontoPresupuestado' };
        arrayColumns[6] = { 'data': 'Estado' };
        arrayColumns[7] = { 'data': 'DetalleLicitaciones.IdLicitacion' };
        arrayColumns[8] = { 'data': 'DetalleLicitaciones.Idproducto' };
        arrayColumns[9] = { 'data': 'DetalleLicitaciones.Cantidad' };

        alert('cargando tabla');
         
    

        $('#tblLicitacion').DataTable({
            ajax: {
                method: "GET",
                url: app_api_url + "/api/Licitaciones/ObtenerLicitaciones",
                contentType: "application/json;charset=utf-8",
                dataSrc: function (json) {
                    console.log(json);
                    var jsonResult = { 'data': json }
                    console.log(jsonResult);
                    return jsonResult.data;
                }

            },
            columns: arrayColumns

        })


        //Manejar el click de cada row de la tabla para que muestre los datos en el formulario
        $('#tblLicitacion tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');
            var data = $('#tblLicitacion').DataTable().row(tr).data();

            var actionsC = new ActionsControl();
            actionsC.BindFields("frmLicitacion", data);

        })
    }
}

$(document).ready(function () {
    var views = new Licitaciones(); //Crea una instancia de nuestra funcion principal
    views.InitView(); //Llama a nuestro metodos para inicializar propiedades
})