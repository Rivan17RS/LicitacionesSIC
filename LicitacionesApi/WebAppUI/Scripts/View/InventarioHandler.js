$(document).ready(function () {
    var tablaHTML = $('#tblInventario').DataTable();
    tablaHTML.clear().draw();

    $.each(Products, function (index, producto) {
        tablaHTML.row.add([
            producto.Id,
            producto.Nombre,
            producto.Descripcion,
            '<div class="btn-group" role="group">' +
            '<button class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button>' +
            '<button class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
            '</div>'
        ]).draw();
    });

    $('#tblInventario thead').on('click', 'tr .crear', function () {
        $.ajax({
            url: "/Inventario/PopupView",
            success: function (data) {
                $("#popupContent").html(data);
                $("#popupModal").modal("show");
            }
        });
    });

    $('#tblInventario tbody').on('click', 'tr .editar', function () {
        $('#tblInventario tbody').on('click', 'tr .editar', function () {
            var tr = $(this).closest('tr');

            var data = tablaHTML.row(tr).data();
            $('#txtIdProducto').val(data[0]);
            $('#txtProducto').val(data[1]);
            $('#txtDescripcion').val(data[2]);

            $('#ProductoForm').show();
            $('#frmProducto #IdProduct').show();
            $('#frmProducto #FechaCreacion').show();
        });
    });

    $('#tblInventario tbody').on('click', 'tr .eliminar', function () {
        // lógica para eliminar el producto seleccionado
    })


    $('#frmProducto').on('click', '#btnCancelarProducto', function () {
        $('#frmProducto')[0].reset();
        $('#ProductoForm').hide();
    })
});