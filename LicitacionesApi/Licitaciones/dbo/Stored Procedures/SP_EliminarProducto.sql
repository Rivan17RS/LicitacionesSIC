CREATE PROCEDURE SP_EliminarProducto
(
    @Id INT
)
AS
BEGIN
    SET NOCOUNT ON;
    delete Productos
    WHERE Id = @Id;
END