CREATE PROCEDURE SP_ActualizarDetalleLicitacion
    @IdDetalleLicitacion INT,
    @IdProducto INT,
    @Cantidad INT,
    @IdUsrActualizacion INT
AS
BEGIN
    UPDATE DetalleLicitaciones
    SET IdProducto = @IdProducto,
        Cantidad = @Cantidad,
        IdUsrActualizacion = @IdUsrActualizacion,
        FechaActualizacion = GETDATE()
    WHERE Id = @IdDetalleLicitacion
END