CREATE PROCEDURE SP_ObtenerLicitacionesFiltro
(
    @Id INT = 0,
    @IdAnalista INT = 0,
    @Titulo VARCHAR(100) = NULL,
    @LugarEntrega VARCHAR(100) = NULL,
    @FechaCierreOfertas DATETIME = '1753-01-01 00:00:00',
    @MontoPresupuestado DECIMAL(18,2) = 0,
    @Estado VARCHAR(20) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF (@Id = 0 AND @IdAnalista = 0 AND @Titulo IS NULL AND @LugarEntrega IS NULL AND @FechaCierreOfertas = '1753-01-01 00:00:00' AND @MontoPresupuestado = 0 AND @Estado IS NULL)
    BEGIN
        SELECT TOP 500 *
        FROM Licitaciones;
    END
    ELSE
    BEGIN
        SELECT *
        FROM Licitaciones
        WHERE 
            (@Id = 0 OR Id = @Id)
            AND (@IdAnalista = 0 OR IdAnalista = @IdAnalista)
            AND (@Titulo IS NULL OR Titulo LIKE '%' + @Titulo + '%')
            AND (@LugarEntrega IS NULL OR LugarEntrega LIKE '%' + @LugarEntrega + '%')
            AND (@FechaCierreOfertas = '1753-01-01 00:00:00' OR CONVERT(date, FechaCierreOfertas) = CONVERT(date, @FechaCierreOfertas))
            AND (@MontoPresupuestado = 0 OR MontoPresupuestado = @MontoPresupuestado)
            AND (@Estado IS NULL OR Estado = @Estado);
    END
END