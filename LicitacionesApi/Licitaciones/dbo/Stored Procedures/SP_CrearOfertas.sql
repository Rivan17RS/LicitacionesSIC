CREATE PROCEDURE SP_CrearOfertas
	@IdLicitacion INT,
	@IdUsuario INT,
	@FechaEntrega DATETIME,
	@MontoTotal DECIMAL(18,2),
	@IdUsrCreacion INT
AS
	BEGIN 
	SET NOCOUNT ON;
	
	INSERT INTO Ofertas (
	IdLicitacion,
	IdUsuario,
	FechaEntrega,
	MontoTotal,
	IdUsrCreacion,
	FechaCreacion
	) VALUES (
	@IdLicitacion,
	@IdUsuario,
	@FechaEntrega,
	@MontoTotal,
	@IdUsrCreacion,
	GETDATE()
	);
END