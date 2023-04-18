CREATE PROCEDURE [dbo].[SP_ObtenerUsuariosFiltro]
    @Nombre VARCHAR(50) = null ,
    @Apellidos VARCHAR(100) = null ,
    @Identificacion VARCHAR(20)= null  ,
    @Telefono VARCHAR(20)= null  ,
    @CorreoElectronico VARCHAR(100)= null ,
	@Estado INT = 2,
    @IdRol INT = 0
AS
BEGIN
IF (@Nombre is null AND @Apellidos is null AND @Identificacion is null AND @Telefono is null AND @CorreoElectronico is null AND @Estado=2 AND @IdRol=0)
BEGIN
    SELECT TOP 500 *
    FROM Usuarios
END
ELSE
BEGIN
    SELECT *
    FROM Usuarios
    WHERE (@Nombre is null OR Nombre LIKE '%' + @Nombre + '%')
        AND (@Apellidos is null OR Apellidos LIKE '%' + @Apellidos + '%')
        AND (@Identificacion is null OR Identificacion = @Identificacion)
        AND (@Telefono is null OR Telefono = @Telefono)
        AND (@CorreoElectronico is null OR CorreoElectronico = @CorreoElectronico)
        AND (@Estado = 2 OR Estado = @Estado)
        AND (@IdRol = 0 OR IdRol = @IdRol)
END

END