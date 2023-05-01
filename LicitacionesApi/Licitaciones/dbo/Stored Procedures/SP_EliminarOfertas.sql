CREATE PROCEDURE SP_EliminarOfertas
	@IdOferta INT
AS
BEGIN
	SET NOCOUNT ON;
	-- Eliminar detalles de oferta
	DELETE FROM DetalleOfertas
	WHERE IdOferta = @IdOferta;

	-- Eliminar la Oferta
	DELETE FROM Ofertas
	WHERE Id = @IdOferta;
END
