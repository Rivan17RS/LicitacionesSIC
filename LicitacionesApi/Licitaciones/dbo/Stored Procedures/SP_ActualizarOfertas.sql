CREATE PROCEDURE SP_ActualizarOfertas
	@Id INT,
	@IdLicitacion INT,
	@IdUsuario INT,
	@FechaEntrega DATETIME,
	@MontoTotal DECIMAL(18,2),
	@IdUsrActualizacion INT
AS
BEGIN
	UPDATE Ofertas
	SET
	IdLicitacion = @IdLicitacion,
	IdUsuario = @IdUsuario,
	FechaEntrega = @FechaEntrega,
	MontoTotal = @MontoTotal,
	IdUsrActualizacion = @IdUsrActualizacion,
	FechaActualizacion = GETDATE()
	WHERE Id = @Id
END