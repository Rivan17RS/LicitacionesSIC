CREATE PROCEDURE SP_EliminarRoles
    @ID INT
AS
BEGIN
    DELETE FROM Suscripciones
    WHERE Id = @ID
END