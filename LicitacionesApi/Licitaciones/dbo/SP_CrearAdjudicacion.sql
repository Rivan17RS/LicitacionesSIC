CREATE PROCEDURE SP_CrearAdjudicacion
(
@IdUsrCreacion INT,
@IdOferta INT,
@IdUsuario INT,
@FechaAdjudicacion DATETIME
)
AS
BEGIN
SET NOCOUNT ON;
INSERT INTO Adjudicaciones (IdUsrCreacion, IdOferta, IdUsuario, FechaAdjudicacion, FechaCreacion)
VALUES (@IdUsrCreacion, @IdOferta, @IdUsuario, @FechaAdjudicacion, GETDATE());
END