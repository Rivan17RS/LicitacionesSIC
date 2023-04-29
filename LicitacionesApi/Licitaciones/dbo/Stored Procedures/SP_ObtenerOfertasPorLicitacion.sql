CREATE PROCEDURE SP_ObtenerOfertasPorLicitacion
	@IdLicitacion INT
AS
	SELECT *
	FROM Ofertas
	WHERE IdLicitacion = @IdLicitacion
RETURN 0
