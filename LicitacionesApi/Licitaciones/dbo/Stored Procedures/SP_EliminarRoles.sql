CREATE PROCEDURE SP_EliminarAdjudicacion
    @ID INT
AS
BEGIN
    DELETE FROM Adjudicaciones
    WHERE Id = @ID
END