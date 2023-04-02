
//function mostrarDetallesLicitacion(idLicitacion) {
//    $('#tblDetallesLicitacion').remove();
//    $('#titleDetallesLicitacion').remove();

//    $.ajax({
//        method: "GET",
//        url: "https://localhost:44369/api/DetalleLicitaciones/ObtenerDetalleLicitacionesId?IdLicitacion=" + idLicitacion,
//        contentType: "application/json;charset=utf-8",
//        success: function (data) {

//            var promises = [];
//            var tablaDetalles = "<br><h2 id='titleDetallesLicitación' >Detalles Licitacion</h2><br><table id='tblDetallesLicitacion' class='table table-hover table-light'>";
//            tablaDetalles += "<thead><tr><th>IdLicitacion</th><th>IdProducto</th><th>Producto</th><th>Cantidad</th></tr></thead>";
//            tablaDetalles += "<tbody>";
//            $.each(data, function (index, value) {
//                var promise = $.ajax({
//                    method: "GET",
//                    url: "#" + value.Idproducto,
//                    contentType: "application/json;charset=utf-8"
//                }).then(function (producto) {
//                    tablaDetalles += "<tr><td>" + value.IdLicitacion + "</td><td>" + value.Idproducto + "</td><td>" + producto.Nombre + "</td><td>" + value.Cantidad + "</td></tr>";
//                });
//                promises.push(promise);
//            });
//            Promise.all(promises).then(function () {
//                tablaDetalles += "</tbody></table>";
//                $('#tblLicitaciones').after(tablaDetalles);
//            });
//        }
//    });
//}


//funcion de testing

function mostrarDetallesLicitacion(idLicitacion) {
    $('#tblDetallesLicitacion').remove();
    $('#titleDetallesLicitacion').remove();
    $.ajax({
        method: "GET",
        url: "https://localhost:44369/api/DetalleLicitaciones/ObtenerDetalleLicitacionesId?IdLicitacion=" + idLicitacion,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            var tablaDetalles = "<br><h2 id='titleDetallesLicitacion' >Detalles Licitación</h2><br><table id='tblDetallesLicitacion' class='table table-hover table-light'>";
            tablaDetalles += "<thead><tr><th>IdLicitación</th><th>IdProducto</th><th>Producto</th><th>Cantidad</th></tr></thead>";
            tablaDetalles += "<tbody>";
            $.each(data, function (index, value) {
                var product = Products.find(p => p.Id === value.Idproducto);
                if (product) {
                    tablaDetalles += "<tr><td>" + value.IdLicitacion + "</td><td>" + value.Idproducto + "</td><td>" + product.Nombre + "</td><td>" + value.Cantidad + "</td></tr>";
                } else {
                    tablaDetalles += "<tr><td>" + value.IdLicitacion + "</td><td>" + value.Idproducto + "</td><td>Producto no encontrado</td><td>" + value.Cantidad + "</td></tr>";
                }
            });
            tablaDetalles += "</tbody></table>";
            $('#tblLicitaciones').after(tablaDetalles);
        },
    });
}





//function LicitacionesTable() {
//    var arrColumns = [];
//    arrColumns[0] = { 'data': 'IdAnalista' }
//    arrColumns[1] = { 'data': 'Id' }
//    arrColumns[2] = { 'data': 'Titulo' }
//    arrColumns[3] = { 'data': 'Descripcion' }
//    arrColumns[4] = { 'data': 'LugarEntrega' }
//    arrColumns[5] = { 'data': 'FechaCierreOfertas' }
//    arrColumns[6] = { 'data': 'MontoPresupuestado' }
//    arrColumns[7] = { 'data': 'Estado' }




//    $('#tblLicitaciones').DataTable().destroy();


//    var tablaLicitaciones = $('#tblLicitaciones').DataTable({
//        ajax: {
//            method: "GET",
//            url: "https://localhost:44369/api/Licitacion/ObtenerLicitaciones",
//            contentType: "application/json;charset=utf-8",
//            dataSrc: function (json) {
//                console.log(json);
//                var jsonResult = { 'data': json };
//                console.log(jsonResult);
//                return jsonResult.data;
//            }
//        },
//        columns: arrColumns
//    });

//    $('#tblLicitaciones tbody').on('click', 'tr', function () {
//        var data = tablaLicitaciones.row(this).data();
//        var licitacionId = data.Id;
//        mostrarDetallesLicitacion(licitacionId);
//    }).css('cursor', 'pointer').attr('title', 'Click para ver detalles');
//}


function LicitacionesTable() {
    var arrColumns = [
        { 'data': 'IdAnalista' },
        { 'data': 'Id' },
        { 'data': 'Titulo' },
        { 'data': 'Descripcion' },
        { 'data': 'LugarEntrega' },
        { 'data': 'FechaCierreOfertas' },
        { 'data': 'MontoPresupuestado' },
        { 'data': 'Estado' }
    ];
    if ($.fn.DataTable.isDataTable('#tblLicitaciones')) {
        $('#tblLicitaciones').DataTable().destroy();
    }

    var tablaLicitaciones = $('#tblLicitaciones').DataTable({
        ajax: {
            method: "GET",
            url: "https://localhost:44369/api/Licitacion/ObtenerLicitaciones",
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
    $('#tblLicitaciones tbody').off('click', 'tr').on('click', 'tr', function () {
        var licitacionId = $(this).find('td:eq(1)').text();
        mostrarDetallesLicitacion(licitacionId);
    }).css('cursor', 'pointer').attr('title', 'Click para ver detalles');
}






//testing

var Products = [
    {
        "Id": 1,
        "Nombre": "Leche(l)",
        "Descripcion": "Leche entera pasteurizada enriquecida con vitaminas",
        "Precio": 2.99,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 100,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 2,
        "Nombre": "Queso(kg)",
        "Descripcion": "Queso semiduro de leche de vaca",
        "Precio": 4.50,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 50,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 3,
        "Nombre": "Yogurt(l)",
        "Descripcion": "Yogurt natural bajo en grasas",
        "Precio": 1.75,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 200,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 4,
        "Nombre": "Carne de res(kg)",
        "Descripcion": "Carne de res fresca sin hueso",
        "Precio": 8.99,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 30,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 5,
        "Nombre": "Pollo(und)",
        "Descripcion": "Pollo fresco cortado en trozos",
        "Precio": 5.25,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 40,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 6,
        "Nombre": "Pescado(kg)",
        "Descripcion": "Filetes de pescado fresco",
        "Precio": 7.75,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 20,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 7,
        "Nombre": "Pan integral(und)",
        "Descripcion": "Pan integral recién horneado",
        "Precio": 3.25,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 80,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
},
    {
        "Id": 8,
        "Nombre": "Huevos(und)",
        "Descripcion": "Huevos frescos de gallinas libres de jaula",
        "Precio": 2.50,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 120,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 9,
        "Nombre": "Frijoles(kg)",
        "Descripcion": "Frijoles negros cocidos y enlatados",
        "Precio": 1.99,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 150,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    },
    {
        "Id": 10,
        "Nombre": "Arroz(kg)",
        "Descripcion": "Arroz integral de grano largo",
        "Precio": 4.75,
        "FechaRegistro": "2023-04-01T18:35:00.000Z",
        "Stock_Cantidad": 100,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00.000Z"
    }
]
