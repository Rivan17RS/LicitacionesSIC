CREATE PROC [dbo].[EliminarStockProductos]
	@IdProducto INT,
	@IdUsuario INT
AS
BEGIN
	DELETE FROM StockProductos
	WHERE IdProducto = @IdProducto AND IdUsuario = @IdUsuario
END