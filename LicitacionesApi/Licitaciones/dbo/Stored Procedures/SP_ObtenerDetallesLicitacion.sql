CREATE PROCEDURE SP_ObtenerDetallesLicitacion
    @IdLicitacion INT
AS
BEGIN
    SELECT *
    FROM DetalleLicitaciones
    WHERE IdLicitacion = @IdLicitacion
END