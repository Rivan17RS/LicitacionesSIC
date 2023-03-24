CREATE PROCEDURE [SP_ObtenerUsuarioPorIdentificacion]
    @identificacion VARCHAR(20)
AS
BEGIN
    SELECT *
    FROM Usuarios
    WHERE Identificacion = @identificacion
END