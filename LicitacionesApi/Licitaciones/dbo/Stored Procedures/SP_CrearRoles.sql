CREATE PROCEDURE SP_CrearRoles
(
    @IdUsrCreacion INT,
    @Nombre VARCHAR(50),
    @Estado BIT
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Suscripciones (IdUsrCreacion, Nombre, Estado, FechaCreacion)
    VALUES (@IdUsrCreacion, @Nombre, @Estado, GETDATE());
END
