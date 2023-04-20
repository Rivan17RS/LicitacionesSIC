CREATE PROCEDURE SP_ObtenerPremiumId
(
    @Id INT
)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM Suscripciones
    WHERE Id = @Id;
END