CREATE PROCEDURE SP_EliminarPremium
(
    @Id INT
)
AS
BEGIN
    SET NOCOUNT ON;
    delete Suscripciones
    WHERE Id = @Id;
END