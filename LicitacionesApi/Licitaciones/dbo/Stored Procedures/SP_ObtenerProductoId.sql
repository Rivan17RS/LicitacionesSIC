CREATE PROCEDURE SP_ObtenerProductoId
(
    @Id INT
)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Productos
    WHERE Id = @Id;
END