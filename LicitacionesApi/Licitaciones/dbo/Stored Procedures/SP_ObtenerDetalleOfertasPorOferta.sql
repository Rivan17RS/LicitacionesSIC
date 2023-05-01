CREATE PROCEDURE [dbo].[SP_ObtenerDetalleOfertasPorOferta]
	@IdOferta INT
AS
	SELECT *
	FROM Ofertas
	WHERE Id = @IdOferta
RETURN 0
