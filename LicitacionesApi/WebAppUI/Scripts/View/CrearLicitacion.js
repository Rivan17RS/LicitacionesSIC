var counter = 1;



$(document).ready(function () {
    $("#btnEnviarLicitacion").on('click',function () {
        EnviarLicitacion()
    });

    //Funcion para agregar bloques de codigo en el form de productos
    $(".agregar-producto").click(function () {
        var nuevoBloqueProducto = $(".bloque-producto:first").clone();
        nuevoBloqueProducto.find("input").val("");
        $(".col-producto").append(nuevoBloqueProducto);
        $(".bloque-producto:last").attr("id", "numprod-" + counter);
        counter++

    });

    //Funcion para borrar el bloque de codigo de un producto (hasta el card)
    $(document).on("click", ".remover-producto", function () {
        if ($(".bloque-producto").length > 1) {
            $(this).closest(".bloque-producto").remove();
        }
    });
    CargarProductos();
});




function EnviarLicitacion() {
    var licitacion = {}
    licitacion.IdAnalista = parseInt(IdUserSession);
    licitacion.Titulo = $('#txtTitulo').val();
    licitacion.Descripcion = $('#txtDescripcion').val();
    licitacion.LugarEntrega = $('#txtLugarEntrega').val();
    licitacion.FechaCierreOfertas = $('#txtFechaCierreOfertas').val();
    licitacion.MontoPresupuestado = $('#txtMontoPresupuestado').val();
    licitacion.IdUsrCreacion = parseInt(IdUserSession);

    var apiURL = "https://licitaciones-api.azurewebsites.net/api/Licitacion/CrearLicitacion";

    $.ajax({
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        method: "POST",
        url: apiURL,
        contentType: "application/json",
        data: JSON.stringify(licitacion),
        success: function (response) {
            ObtenerUltimaLicitacion().then(function (lic) {
                $('.bloque-producto').each(function () {
                    var producto = {}
                    producto.IdLicitacion = lic.Id;
                    producto.IdProducto = $(this).find('#ProductoNombre').val();
                    producto.Cantidad = $(this).find('#ProductoCantidad').val();
                    producto.IdUsrCreacion = parseInt(IdUserSession);
                    CrearDetalleLic(producto);
                });
                location.reload();
                alert('Licitación creada correctamente')
            })
        },
        error: function (xhr, status, error) {
            console.log(error);
            alert('Error, no se pudo crear');
        }
    });
}


function CrearDetalleLic(prod) {
    $.ajax({
        Headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        method: "POST",
        url: "https://licitaciones-api.azurewebsites.net/api/DetalleLicitaciones/CrearDetalleLicitacion",
        contentType: "application/json",
        data: JSON.stringify(prod),
        hasContent: true
    });
}

function CargarProductos() {
    const selectProductos = $("#ProductoNombre");
    $.ajax({
        url: "https://licitaciones-api.azurewebsites.net/api/Producto/ObtenerProductos",
        type: "GET",
        dataType: "json",
        success: function (productos) {
            $.each(productos, function (index, producto) {

                const opcion = $("<option>")
                    .val(producto.Id)
                    .text(producto.Nombre);
                selectProductos.append(opcion);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los productos:", error);
        }
    });
}


function ObtenerUltimaLicitacion() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://licitaciones-api.azurewebsites.net/api/Licitacion/ObtenerLicitaciones",
            method: "GET",
            success: function (data) {
                var ultimaOferta = data[data.length - 1];
                resolve(ultimaOferta);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Error en la llamada AJAX: " + errorThrown);
                reject(errorThrown);
            }
        });
    });
}