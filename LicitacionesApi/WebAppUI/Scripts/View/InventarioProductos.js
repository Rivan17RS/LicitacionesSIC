function MostrarInventario(products) {
    var tablaHTML = $('#tblInventario').DataTable();
    tablaHTML.clear().draw();

    $.each(products, function (index, producto) {
        tablaHTML.row.add([
            producto.Id,
            producto.Nombre,
            producto.Descripcion,
            producto.Precio,
            producto.FechaRegistro,
            producto.Stock_Cantidad
        ]).draw();
    });

    $('#tblInventario tbody').on('click', 'tr', function () {
        var tr = $(this);
        var data = tablaHTML.row(tr).data();
        var actionsC = new ActionsControl();
        actionsC.BindFields("frmProducto", data);

        $("#txtIdProducto").attr("ColumnDataName", "Id");
        $("#txtProducto").attr("ColumnDataName", "Nombre");
        $("#txtDescripcion").attr("ColumnDataName", "Descripcion");
        $("#txtPrecio").attr("ColumnDataName", "Precio");
        $("#txtFechaCreacion").attr("ColumnDataName", "FechaRegistro");
        $("#txtCantidad").attr("ColumnDataName", "Stock_Cantidad");

        $('#frmProducto').show();
    }).css('cursor', 'pointer').attr('title', 'Click para ver detalles');
}
