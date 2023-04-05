$(document).ready(function () {
    var tablaHTML = $('#tblInventario').DataTable();
    var actionsRow = '<div class="btn-group" role="group">' +
        '<button class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
        '<button class="btn btn-sm btn-danger substract" data-toggle="tooltip" title="Remove"><i class="fas fa-minus"></i></button>' +
        '<button class="btn btn-sm btn-danger add" data-toggle="tooltip" title="Remove"><i class="fas fa-plus"></i></button>' +
        '</div>';
    var dropdown = $("#inventarioDropdown");
    var cantidadInput = $("#cantidadInput");
    var inputWarning = $("#inputWarning");

    tablaHTML.clear().draw();

    function LookupProducto(id) {
        var productoFound = {};
        Products.forEach((producto) => {
            if (producto.Id === id) {
                productoFound = producto;
            }
        });
        return productoFound;
    }

    function LookupProductoUser(id) {
        var productoFound = {};

        producto_user.forEach((producto) => {
            if (producto.Id === id) {
                productoFound = producto;
            }
        });

        return productoFound;
    }

    function updateProductoUser(id, cantidad) {

        tablaHTML.rows().every((rowIndex, TableLoop, ColumnLoop) => {
            if (tablaHTML.row(rowIndex).data()[0] === id) {
                console.log(tablaHTML.row(rowIndex).data()[0], id, cantidad);
                tablaHTML.cell(rowIndex, 2).data(cantidad).draw();
            }
        });
    }

    $.each(producto_user, function (index, producto) {

        if (producto.userId === userId) {
            tablaHTML.row.add([
                producto.Id,
                producto.Nombre,
                producto.cantidad,
                actionsRow
            ]).draw();
        }
        
    });

    $.each(Products, function (index, producto) {
        var option = document.createElement('option');
        option.value = producto.Id;
        option.text = producto.Nombre + " : " + producto.Descripcion;

        dropdown.append(option);
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
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        var productId = rowData[0];
        var cantidad = rowData[2];
        producto_user.forEach(function (producto) {
            if (producto.Id === productId && producto.userId === $('#tblInventario').data('user')) {
                producto.cantidad -= cantidad;
                if (producto.cantidad <= 0) {
                    producto_user.splice(producto_user.indexOf(producto), 1);
                }
            }
        });
        tablaHTML.row(row).remove().draw();
    })

    $('#tblInventario tbody').on('click', 'tr .substract', function () {
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        var cantidad = rowData[2];
        if (cantidad > 1) {
            tablaHTML.cell(row, 2).data(cantidad - 1).draw();
        } else {
            tablaHTML.row(row).remove().draw();
        }
    })

    $('#tblInventario tbody').on('click', 'tr .add', function () {
        var row = $(this).closest('tr');
        var rowData = tablaHTML.row(row).data();
        var cantidad = rowData[2];
        tablaHTML.cell(row, 2).data(cantidad + 1).draw();
    })

    $("#agregarProducto").on('click', function () {

        var dropwdownValue = $("#inventarioDropdown :selected").val();

        if (parseInt(dropwdownValue) === 0 || parseInt(cantidadInput.val()) === 0 || parseInt(cantidadInput.val()) < 0 || cantidadInput.val() === "") {
            console.log(inputWarning);
            inputWarning.removeClass("d-none");
            return
        }

        else {
            console.log(cantidadInput.val(), dropwdownValue);
            inputWarning.addClass("d-none");
        }

        var producto = LookupProducto(parseInt(dropwdownValue));

        var productoUser = LookupProductoUser(parseInt(dropwdownValue));

        if (productoUser.Id === producto.Id) {
            productoUser.cantidad += parseInt(cantidadInput.val());
            updateProductoUser(productoUser.Id, productoUser.cantidad);
        }

        else {
            var cantidad = cantidadInput.val();
            tablaHTML.row.add([producto.Id, producto.Nombre, cantidad, actionsRow]).draw();
        }
    });
});