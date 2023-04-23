CREATE PROCEDURE SP_ObtenerRolesId
    @Id INT
AS
BEGIN
    SELECT *
    FROM Roles
    WHERE Id = @Id
END