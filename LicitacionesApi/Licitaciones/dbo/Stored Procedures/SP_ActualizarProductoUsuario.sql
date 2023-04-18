CREATE PROCEDURE SP_ActualizarProductoUsuario
    @IdUsuario INT,
    @IdProducto INT,
    @Cantidad INT,
    @PrecioUnidad DECIMAL(18, 2)

AS
BEGIN
    UPDATE StockProductos
    SET Cantidad = @Cantidad,
        PrecioUnidad = @PrecioUnidad
    WHERE IdUsuario = @IdUsuario AND IdProducto = @IdProducto
END