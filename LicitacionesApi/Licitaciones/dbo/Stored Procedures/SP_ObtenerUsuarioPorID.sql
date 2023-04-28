CREATE PROCEDURE SP_ObtenerUsuarioPorID
    @id INT
AS
BEGIN
    SELECT *
    FROM [dbo].[Usuarios]
    WHERE [Id] = @id
END