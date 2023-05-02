CREATE PROCEDURE [dbo].[SP_CrearDetalleOfertas]
	@IdOferta INT,
	@IdProducto INT,
	@Cantidad INT,
	@IdUsrCreacion INT
AS
	BEGIN
	SET NOCOUNT ON;
	INSERT INTO DetalleOfertas (
	IdOferta,
	IdProducto,
	Cantidad,
	IdUsrCreacion,
	FechaCreacion
	) VALUES (
	@IdOferta,
	@IdProducto,
	@Cantidad,
	@IdUsrCreacion,
	GETDATE()
	);
END