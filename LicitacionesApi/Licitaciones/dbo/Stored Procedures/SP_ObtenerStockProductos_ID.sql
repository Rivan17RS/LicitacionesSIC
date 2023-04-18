CREATE PROCEDURE [dbo].[SP_ObtenerStockProductos_ID]
    @IdUsuario INT,
    @IdProducto INT
AS
BEGIN
    SELECT *
    FROM StockProductos
    WHERE IdUsuario = @IdUsuario AND IdProducto = @IdProducto
END