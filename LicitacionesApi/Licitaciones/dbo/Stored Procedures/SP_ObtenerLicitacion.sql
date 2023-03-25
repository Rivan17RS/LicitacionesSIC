CREATE PROCEDURE [dbo].[SP_ObtenerLicitacion]
    @Id INT
AS
BEGIN
    SELECT *
    FROM Licitaciones
    WHERE Id = @Id
END