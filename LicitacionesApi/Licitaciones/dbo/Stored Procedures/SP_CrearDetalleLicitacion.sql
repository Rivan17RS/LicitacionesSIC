CREATE PROCEDURE SP_CrearDetalleLicitacion
    @IdLicitacion INT,
    @IdProducto INT,
    @Cantidad INT,
    @IdUsrCreacion INT
AS
BEGIN
    INSERT INTO DetalleLicitaciones (IdLicitacion, IdProducto, Cantidad, IdUsrCreacion, FechaCreacion)
    VALUES (@IdLicitacion, @IdProducto, @Cantidad, @IdUsrCreacion, GETDATE())
END