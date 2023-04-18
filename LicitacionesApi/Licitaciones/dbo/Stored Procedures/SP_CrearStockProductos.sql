CREATE PROC [dbo].[SP_CrearStockProductos]
	@IdUsuario int,
	@IdProducto int,
	@Cantidad int,
	@PrecioUnidad decimal(18,2),
	@FechaCreacion DATETIME,
	@IdUsrCreacion int
AS
BEGIN
SET NOCOUNT ON;
	INSERT INTO StockProductos
	(
		IdUsuario,
		IdProducto,
		Cantidad,
		PrecioUnidad,
		FechaCreacion,
		IdUsrCreacion
	)
	VALUES
	(
		@IdUsuario,
		@IdProducto,
		@Cantidad,
		@PrecioUnidad,
		@FechaCreacion,
		@IdUsrCreacion
	);
END