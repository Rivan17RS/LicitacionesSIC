CREATE PROCEDURE SP_ObtenerProductosFiltro
(
    @Id INT = 0,
    @Nombre VARCHAR(50) = NULL,
    @Precio DECIMAL(18,2) = 0,
    @FechaCreacion DATETIME = '1753-01-01 00:00:00',
    @Stock_Cantidad INT = 0,
    @IdUsrCreacion INT = 0
)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF (@Id= 0 AND @Nombre IS NULL AND @Precio = 0 AND @FechaCreacion ='1753-01-01 00:00:00' AND @Stock_Cantidad =0 AND @IdUsrCreacion =0)
    BEGIN
        SELECT TOP 500 *
        FROM Productos;
    END
    ELSE
    BEGIN
        SELECT *
        FROM Productos
        WHERE 
    (@Id = 0 OR Id = @Id)
    AND (@Nombre IS NULL OR Nombre LIKE '%' + @Nombre + '%')
    AND (@Precio = 0 OR Precio = @Precio)
    AND (@FechaCreacion = '1753-01-01' OR CONVERT(date, FechaCreacion) = CONVERT(date, @FechaCreacion))
    AND (@Stock_Cantidad = 0 OR Stock_Cantidad = @Stock_Cantidad)
    AND (@IdUsrCreacion = 0 OR IdUsrCreacion = @IdUsrCreacion);
    END
END