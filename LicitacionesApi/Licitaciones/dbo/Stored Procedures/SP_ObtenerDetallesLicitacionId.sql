CREATE PROCEDURE SP_ObtenerDetallesLicitacionId
    @IdLicitacion INT
AS
BEGIN
    SELECT *
    FROM DetalleLicitaciones
    WHERE IdLicitacion = @IdLicitacion
END