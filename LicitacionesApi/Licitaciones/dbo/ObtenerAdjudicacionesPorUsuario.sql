CREATE PROCEDURE SP_ObtenerAdjudicacionesPorUsuario
    @IdUsuario INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id, IdOferta, IdUsuario, FechaAdjudicacion, IdUsrCreacion, IdUsrActualizacion, IdUsrEliminacion, FechaCreacion
    FROM Adjudicaciones
    WHERE IdUsuario = @IdUsuario
END