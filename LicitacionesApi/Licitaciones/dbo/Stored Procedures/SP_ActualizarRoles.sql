CREATE PROCEDURE SP_ActualizarRoles
(
    @Id INT,
    @Nombre VARCHAR(50),
    @Estado BIT,
    @IdUsrActualizacion INT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Roles
    SET Nombre = @Nombre,
        Estado = @Estado,
        IdUsrActualizacion = @IdUsrActualizacion,
        FechaActualizacion = GETDATE()
    WHERE Id = @Id;
END