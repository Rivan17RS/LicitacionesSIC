CREATE PROCEDURE [dbo].[SP_ObtenerDetalleOfertasPorOferta]
	@IdOferta INT
AS
	SELECT *
	FROM Ofertas
	WHERE IdOferta = @IdOferta
RETURN 0
