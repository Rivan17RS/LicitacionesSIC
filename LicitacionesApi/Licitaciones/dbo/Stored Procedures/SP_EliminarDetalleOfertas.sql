CREATE PROCEDURE [dbo].[SP_EliminarDetalleOfertas]
	@Id INT
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM DetalleOfertas
	WHERE Id = @Id;

END