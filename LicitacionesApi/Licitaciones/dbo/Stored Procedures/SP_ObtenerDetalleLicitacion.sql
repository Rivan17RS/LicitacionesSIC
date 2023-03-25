CREATE PROCEDURE SP_ObtenerDetalleLicitacion
    @IdDetalleLicitacion INT
AS
BEGIN
    SELECT *
    FROM DetalleLicitaciones
    WHERE Id = @IdDetalleLicitacion
END