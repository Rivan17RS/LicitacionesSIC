CREATE PROCEDURE SP_CrearRoles
(
    @IdUsrCreacion INT,
    @Nombre VARCHAR(50),
    @Estado VARCHAR(50)
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Suscripciones (IdUsrCreacion, Nombre, Estado, FechaCreacion)
    VALUES (@IdUsrCreacion, @Nombre, @Estado, GETDATE());
END
