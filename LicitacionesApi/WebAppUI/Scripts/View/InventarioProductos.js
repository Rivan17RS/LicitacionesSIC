function MostarInventario(Products) {

    var arrColumns = [
        { 'data': 'Id' },
        { 'data': 'Nombre' },
        { 'data': 'Descripcion' },
        { 'data': 'Precio' },
        { 'data': 'FechaRegistro' },
        { 'data': 'Stock_Cantidad' },
        { 'data': 'IdUsrCreacion' },
        { 'data': 'FechaCreacion' }
    ];

    // Creamos la tabla con DataTables
    var tablaProductos = $('#tblInventario').DataTable({
        data: Products,
        columns: arrColumns
    });

    // Añadimos el evento onclick a las filas de la tabla
    $('#tblInventario tbody').off('click', 'tr').on('click', 'tr', function () {
        // Obtenemos el ID del producto de la fila clickeada
        var productId = $(this).find('td:eq(0)').text();

        // Mostramos los detalles del producto en un modal o en otra sección de la página
        mostrarDetallesProducto(productId);
    }).css('cursor', 'pointer').attr('title', 'Click para ver detalles');
}
