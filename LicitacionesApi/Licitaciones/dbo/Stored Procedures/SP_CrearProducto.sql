CREATE PROCEDURE SP_CrearProducto
(
    @Nombre VARCHAR(50),
    @Descripcion TEXT,
    @Precio DECIMAL(18,2),
    @Stock_Cantidad INT,
    @IdUsrCreacion INT
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Productos (Nombre, Descripcion, Precio, Stock_Cantidad, IdUsrCreacion, FechaCreacion)
    VALUES (@Nombre, @Descripcion, @Precio, @Stock_Cantidad, @IdUsrCreacion, GETDATE());
END