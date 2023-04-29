CREATE PROCEDURE [dbo].[SP_ActualizarDetalleOfertas]
	@Id INT,
	@IdOferta INT,
	@IdProducto INT,
	@Cantidad INT,
	@IdUsrActualizacion INT,
	@FechaActualizacion DATETIME
AS
	BEGIN
	UPDATE DetalleOfertas
	SET IdOferta = @IdOferta,
	IdProducto = @IdProducto,
	Cantidad = @Cantidad,
	FechaActualizacion = @FechaActualizacion
	WHERE ID = @Id
END
