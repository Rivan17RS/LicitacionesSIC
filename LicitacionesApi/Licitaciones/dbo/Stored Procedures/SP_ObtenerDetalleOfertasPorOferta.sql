CREATE PROCEDURE [dbo].[SP_ObtenerDetalleOfertasPorOferta]
	@IdOferta INT
AS
begin
	SELECT *
	FROM DetalleOfertas
	WHERE IdOferta = @IdOferta

end