CREATE PROCEDURE [dbo].[SP_CrearDetalleOfertas]
	@Id INT,
	@IdOferta INT,
	@IdProducto INT,
	@Cantidad INT,
	@IdUsrCreacion INT,
	@FechaCreacion DATETIME
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
	@FechaCreacion
	);
END