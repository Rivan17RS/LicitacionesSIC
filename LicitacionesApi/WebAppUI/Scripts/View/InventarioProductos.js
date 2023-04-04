function MostrarInventario() {
    var tablaHTML = $('#tblInventario').DataTable();
    tablaHTML.clear().draw();

    $.each(Products, function (index, producto) {
        tablaHTML.row.add([
            producto.Id,
            producto.Nombre,
            producto.Descripcion,
            producto.Precio,
            producto.FechaRegistro,
            producto.Stock_Cantidad,
            '<div class="btn-group" role="group">' +
            '<button class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button>' +
            '<button class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
            '</div>'
        ]).draw();
    });

    $('#tblInventario thead').on('click', 'tr .crear', function () {
        $('#frmProducto')[0].reset();
        $('#ProductoForm').show();
        $('#frmProducto #IdProduct').hide();
        $('#frmProducto #FechaCreacion').hide();
    });

    $('#tblInventario tbody').on('click', 'tr .editar', function () {
        $('#tblInventario tbody').on('click', 'tr .editar', function () {
            var tr = $(this).closest('tr');

            var data = tablaHTML.row(tr).data();
            $('#txtIdProducto').val(data[0]);
            $('#txtProducto').val(data[1]);
            $('#txtDescripcion').val(data[2]);
            $('#txtPrecio').val(data[3]);
            $('#txtFechaCreacion').val(data[4]);
            $('#txtCantidad').val(data[5]);

            $('#ProductoForm').show();
            $('#frmProducto #IdProduct').show();
            $('#frmProducto #FechaCreacion').show();
        });
    });

    $('#tblInventario tbody').on('click', 'tr .eliminar', function () {
        // lógica para eliminar el producto seleccionado
    }).css('cursor', 'pointer').attr('title', 'Click para ver detalles');
}





$('#frmProducto').on('click', '#btnCancelarProducto', function () {
    $('#frmProducto')[0].reset();
    $('#ProductoForm').hide();
});
