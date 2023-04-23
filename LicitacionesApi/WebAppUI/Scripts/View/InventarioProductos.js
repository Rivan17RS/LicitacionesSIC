
var tablacargada = 0;

function MostrarInventario()
{

        arrColumns = [
            { 'data': 'Id' },
            { 'data': 'Nombre' },
            { 'data': 'Descripcion' },
            { 'data': 'Precio' },
            { 'data': 'FechaCreacion' },
            { 'data': 'StockCantidad' },
            {
                'data': 'Configuracion',
                'render': function (data, type, full, meta) {
                    return '<div class="btn-group" role="group">' +
                        '<button class="btn btn-sm btn-primary editar" data-toggle="tooltip" title="Editar"><i class="fas fa-pencil-alt"></i></button>' +
                        '<button class="btn btn-sm btn-danger eliminar" data-toggle="tooltip" title="Eliminar"><i class="fas fa-trash-alt"></i></button>' +
                        '</div>'
                },
                className: 'productConfig',

            },

        ];
        arrColumns[6].visible = false;



    if (tablacargada === 1) {
        var table = $('#tblInventario').DataTable();
        table.ajax.reload();
    } else {


        $('#btnConfigProducto').click(function () {
            var column = tablaProductos.column(6);
            column.visible(!column.visible());
        });

        var tablaProductos = $('#tblInventario').DataTable({
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
                url: "https://licitaciones-api.azurewebsites.net/api/Producto/ObtenerProductosFiltro",
                contentType: "application/json",
                data: function (d) {
                    return JSON.stringify(getFiltros());
                },
                dataSrc: function (json) {
                    var jsonResult = { 'data': json };
                    tablacargada = 1;
                    return jsonResult.data;

                }
            },
            columns: arrColumns,
        });


        $('#tblInventario thead').on('click', 'tr .crear', function () {
            $('#frmProducto')[0].reset();
            $('#frmProducto #IdProduct').hide();
            $('#frmProducto #FechaCreacion').hide();
            $('#btnGuardar').off('click').on('click', function () {
                CrearProducto();
            });
            $('#productoModal').modal('show');
        });



        $('#tblInventario tbody').on('click', 'tr .editar', function () {
            $('#frmProducto')[0].reset();
            var tr = $(this).closest('tr');
            var data = tablaProductos.row(tr).data();
            $('#txtIdProducto').val(data.Id);
            $('#txtProducto').val(data.Nombre);
            $('#txtDescripcion').val(data.Descripcion);
            $('#txtPrecio').val(data.Precio);
            $('#txtCantidad').val(data.StockCantidad);
            $('#frmProducto #IdProduct').show();
            $('#frmProducto #FechaCreacion').hide();
            $('#productoModal').modal('show');
            $('#btnGuardar').off('click').on('click', function () {
                ActualizarProducto();
            });
        });



        $('#tblInventario tbody').on('click', 'tr .eliminar', function () {
            var tr = $(this).closest('tr');
            var data = tablaProductos.row(tr).data();
            var productId = data.Id;
            EliminarProducto(productId);

        }).css('cursor', 'pointer');

        function getFiltros() {
            var prod = {};
            prod.Id = $('#filtroIdProducto').val();
            prod.Nombre = $('#filtroProducto').val();
            prod.Precio = $('#filtroPrecio').val();
            prod.FechaCreacion = $('#filtroFechaCreacion').val();
            prod.StockCantidad = $('#filtroCantidad').val();
            return prod;
        }
    }

}





$(document).ready(function () {
    $('#btnBuscarProductos').on('click', function () {
        MostrarInventario();
    });

    $('#btnLimpiarProductos').on('click', function () {
        $("#filtroProd")[0].reset();

    })
});





function CrearProducto() {
    var prod = {};
    prod.Nombre = $('#txtProducto').val();
    prod.Descripcion = $('#txtDescripcion').val();
    prod.Precio = $('#txtPrecio').val();
    prod.StockCantidad = $('#txtCantidad').val()
    prod.IdUsrCreacion = 1;
    //prod.IdUsrCreacion = parseInt(Id);

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        type: 'POST',
        url: "https://licitaciones-api.azurewebsites.net/api/Producto/CrearProducto",
        contentType: "application/json",
        data: JSON.stringify(prod),
        success: function (response) {
            $('#productoModal').modal('hide');
            MostrarInventario();
            alert('Producto creado correctamente');
        },
        error: function (xhr, status, error) {
            console.log(error); 
            alert('Error, no se pudo registrar');

        }
    });
}

function ActualizarProducto() {
    var prod = {};
    prod.Id = $('#txtIdProducto').val();
    prod.Nombre = $('#txtProducto').val();
    prod.Descripcion = $('#txtDescripcion').val();
    prod.Precio = $('#txtPrecio').val();
    prod.StockCantidad = $('#txtCantidad').val()
    prod.IdUsrActualizacion = 1;
    if (confirm("¿Está seguro que desea actualizar este producto?")) {
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Producto/ActualizarProducto",
            contentType: "application/json",
            data: JSON.stringify(prod),
            success: function (response) {
                $('#productoModal').modal('hide');
                MostrarInventario();
                alert('Producto actualizado correctamente');
            },
            error: function (xhr, status, error) {
                console.log(error);
                alert('Error, no se pudo actualizar');

            }
        });
    }
}


function EliminarProducto(Id) {
    if (confirm("¿Está seguro que desea eliminar este producto?")) {
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            type: 'POST',
            url: "https://licitaciones-api.azurewebsites.net/api/Producto/EliminarProducto/" + Id,
            success: function (response) {
                $('#productoModal').modal('hide');
                MostrarInventario();
            }
        });
    }
}





