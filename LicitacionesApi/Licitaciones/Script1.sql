CREATE PROCEDURE SP_AdjudicacionQR
@AdjudicacionID INT
AS
BEGIN
    SELECT A.Id, O.Id AS OfertaID, L.Titulo, L.Descripcion, L.LugarEntrega, 
           DL.IdProducto, P.Nombre AS ProductoNombre, DL.Cantidad,
           A.FechaAdjudicacion, A.IdUsuario
    FROM Adjudicaciones A
    INNER JOIN Ofertas O ON A.IdOferta = O.Id
    INNER JOIN Licitaciones L ON O.IdLicitacion = L.Id
    INNER JOIN DetalleLicitaciones DL ON L.Id = DL.IdLicitacion
    INNER JOIN Productos P ON DL.IdProducto = P.Id
    WHERE A.Id = @AdjudicacionID
END



CREATE PROCEDURE [dbo].[SP_ObtenerDetalleOfertasPorOferta]
	@IdOferta INT
AS
begin
	SELECT *
	FROM DetalleOfertas
	WHERE IdOferta = @IdOferta

end