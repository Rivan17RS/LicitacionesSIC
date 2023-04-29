CREATE PROCEDURE SP_UpdateAdjudicacion
(
@Id INT,
@IdOferta INT,
@IdUsuario INT,
@FechaAdjudicacion DATETIME,
@IdUsrActualizacion INT
)
AS
BEGIN
SET NOCOUNT ON;
UPDATE Adjudicaciones
SET IdOferta = @IdOferta,
IdUsuario = @IdUsuario,
FechaAdjudicacion = @FechaAdjudicacion,
IdUsrActualizacion = @IdUsrActualizacion,
FechaActualizacion = GETDATE()
WHERE Id = @Id;
END