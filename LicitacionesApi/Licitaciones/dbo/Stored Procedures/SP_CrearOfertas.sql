CREATE PROCEDURE SP_CrearOfertas
	@Id INT,
	@IdOferta INT,
	@IdLicitacion INT,
	@IdUsuario INT,
	@FechaEntrega DATETIME,
	@MontoTotal DECIMAL(18,2),
	@IdUsrCreacion INT,
	@FechaCreacion DATETIME
AS
	BEGIN 
	SET NOCOUNT ON;
	
	INSERT INTO Ofertas (
	IdOferta,
	IdLicitacion,
	IdUsuario,
	FechaEntrega,
	MontoTotal,
	IdUsrCreacion,
	FechaCreacion
	) VALUES (
	@IdOferta,
	@IdLicitacion,
	@IdUsuario,
	@FechaEntrega,
	@MontoTotal,
	@IdUsrCreacion,
	@FechaCreacion
	);
END