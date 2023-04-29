CREATE PROCEDURE SP_ActualizarLicitacion
    @Id INT,
    @Titulo VARCHAR(100),
    @Descripcion TEXT,
    @LugarEntrega VARCHAR(100),
    @FechaCierreOfertas DATETIME,
    @MontoPresupuestado DECIMAL(18,2),
    @Estado VARCHAR(20),
    @IdUsrActualizacion INT
AS
BEGIN
    UPDATE Licitaciones
    SET Titulo = @Titulo,
        Descripcion = @Descripcion,
        LugarEntrega = @LugarEntrega,
        FechaCierreOfertas = @FechaCierreOfertas,
        MontoPresupuestado = @MontoPresupuestado,
        Estado = @Estado,
        IdUsrActualizacion = @IdUsrActualizacion,
        FechaActualizacion = GETDATE()
    WHERE Id = @Id
END