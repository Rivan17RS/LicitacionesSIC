CREATE PROCEDURE SP_EliminarDetalleLicitacion
    @IdDetalleLicitacion INT
AS
BEGIN
    Delete DetalleLicitaciones
    WHERE Id = @IdDetalleLicitacion
END