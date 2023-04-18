CREATE PROCEDURE SP_ActualizarProducto
(
    @Id INT,
    @Nombre VARCHAR(50),
    @Descripcion TEXT,
    @Precio DECIMAL(18,2),
    @Stock_Cantidad INT,
    @IdUsrActualizacion INT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Productos
    SET Nombre = @Nombre,
        Descripcion = @Descripcion,
        Precio = @Precio,
        Stock_Cantidad = @Stock_Cantidad,
        IdUsrActualizacion = @IdUsrActualizacion,
        FechaActualizacion = GETDATE()
    WHERE Id = @Id;
END