CREATE PROCEDURE SP_EliminarLicitacion
    @IdLicitacion INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Eliminar los detalles de la licitación
    DELETE FROM DetalleLicitaciones
    WHERE IdLicitacion = @IdLicitacion;

    -- Eliminar la licitación
    DELETE FROM Licitaciones
    WHERE Id = @IdLicitacion;
END