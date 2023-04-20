CREATE PROCEDURE SP_ActualizarPremium
(
    @Id INT,
    @Nombre VARCHAR(50),
    @Descripcion TEXT,
    @PrecioMensual DECIMAL(18,2),
    @Estado BIT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Suscripciones
    SET Nombre = @Nombre,
        Descripcion = @Descripcion,
        PrecioMensual = @PrecioMensual,
        Estado = @Estado
    WHERE Id = @Id;
END