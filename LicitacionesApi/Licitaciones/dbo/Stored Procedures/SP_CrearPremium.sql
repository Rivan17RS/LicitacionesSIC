CREATE PROCEDURE SP_CrearPremium
(
    @Nombre VARCHAR(50),
    @Descripcion TEXT,
    @PrecioMensual DECIMAL(18,2),
    @Estado BIT,
    @IdUsrCreacion INT
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Suscripciones (Nombre, Descripcion, PrecioMensual, Estado, IdUsrCreacion, FechaCreacion)
    VALUES (@Nombre, @Descripcion, @PrecioMensual, @Estado, @IdUsrCreacion, GETDATE());
END