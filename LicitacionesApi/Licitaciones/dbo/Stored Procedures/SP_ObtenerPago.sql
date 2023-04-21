CREATE PROCEDURE SP_ObtenerPago
  @IdPago INT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT Id, IdUsuario, Monto, Estado, IdUsrCreacion, IdUsrActualizacion, IdUsrEliminacion, FechaCreacion, FechaActualizacion, FechaEliminacion, Descripcion
  FROM PagosUsuario
  WHERE Id = @IdPago;

END