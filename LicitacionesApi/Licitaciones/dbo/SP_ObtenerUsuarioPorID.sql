CREATE PROCEDURE [SP_ObtenerUsuarioPorID]
    @Id VARCHAR(20)
AS
BEGIN
    SELECT *
    FROM Usuarios
    WHERE Id = @Id
END