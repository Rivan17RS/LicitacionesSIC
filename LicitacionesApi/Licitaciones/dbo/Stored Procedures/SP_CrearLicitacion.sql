CREATE PROCEDURE SP_CrearLicitacion
    @IdAnalista INT,
    @Titulo VARCHAR(100),
    @Descripcion TEXT,
    @LugarEntrega VARCHAR(100),
    @FechaCierreOfertas DATETIME,
    @MontoPresupuestado DECIMAL(18, 2),
    @IdUsrCreacion INT,
	@FechaCreacion DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Licitaciones (
        IdAnalista,
        Titulo,
        Descripcion,
        LugarEntrega,
        FechaCierreOfertas,
        MontoPresupuestado,
        IdUsrCreacion,
		FechaCreacion
    ) VALUES (
        @IdAnalista,
        @Titulo,
        @Descripcion,
        @LugarEntrega,
        @FechaCierreOfertas,
        @MontoPresupuestado,
        @IdUsrCreacion,
		@FechaCreacion
    );

END