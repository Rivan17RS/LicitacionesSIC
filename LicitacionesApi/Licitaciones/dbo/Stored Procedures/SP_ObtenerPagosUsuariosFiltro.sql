CREATE PROCEDURE SP_ObtenerPagosUsuariosFiltro
(
    @IdUsuario INT = 0,
    @Monto DECIMAL(18,2) = 0,
    @FechaCreacion DATETIME = '1753-01-01 00:00:00',
    @Descripcion VARCHAR(200) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    IF (@IdUsuario = 0 AND @Monto = 0 AND @FechaCreacion ='1753-01-01 00:00:00' AND @Descripcion IS NULL)
    BEGIN
        SELECT *
        FROM PagosUsuario
    END
    ELSE
    BEGIN
        SELECT *
        FROM PagosUsuario
        WHERE (@IdUsuario =0 OR IdUsuario = @IdUsuario)
        AND (@Monto =0 OR Monto = @Monto)
        AND (@FechaCreacion = '1753-01-01 00:00:00' OR CONVERT(date, FechaCreacion) = CONVERT(date, @FechaCreacion))
        AND (@Descripcion IS NULL OR Descripcion LIKE '%' + @Descripcion + '%')
    END
END