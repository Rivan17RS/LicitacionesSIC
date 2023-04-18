CREATE PROC [dbo].[SP_EliminarStockProductos]
	@IdUsuario int,
	@IdProducto int
AS
BEGIN
	DELETE FROM StockProducto WHERE IdUsuario = @IdUsuario AND IdProducto = @IdProducto
END