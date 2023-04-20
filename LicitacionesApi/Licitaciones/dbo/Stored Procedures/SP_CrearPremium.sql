CREATE PROCEDURE SP_CrearPremium
(
    @Nombre VARCHAR(50),
    @Descripcion TEXT,
    @PrecioMensual DECIMAL(18,2),
    @Estado BIT
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Suscripciones (Nombre, Descripcion, PrecioMensual, Estado)
    VALUES (@Nombre, @Descripcion, @PrecioMensual, @Estado);
END