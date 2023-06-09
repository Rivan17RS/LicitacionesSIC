﻿CREATE PROCEDURE SP_ActualizarPremium
(
    @Id INT,
    @Nombre VARCHAR(50),
    @Descripcion TEXT,
    @PrecioMensual DECIMAL(18,2),
    @Estado BIT,
    @IdUsrActualizacion INT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Suscripciones
    SET Nombre = @Nombre,
        Descripcion = @Descripcion,
        PrecioMensual = @PrecioMensual,
        Estado = @Estado,
        IdUsrActualizacion = @IdUsrActualizacion,
        FechaActualizacion = GETDATE()
    WHERE Id = @Id;
END