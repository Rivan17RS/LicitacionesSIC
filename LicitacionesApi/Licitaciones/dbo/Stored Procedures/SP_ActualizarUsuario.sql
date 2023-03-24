CREATE PROCEDURE SP_ActualizarUsuario 
@ID INT, 
@Nombre VARCHAR(50),
@Apellidos VARCHAR(50),
@Identificacion VARCHAR(20),
@Telefono VARCHAR(20),
@CorreoElectronico VARCHAR(100),
@Estado BIT,
@Otp VARCHAR(15),
@IdRol INT,
@Contrasena VARCHAR(30),
@IdUsrCreacion INT,
@IdUsrActualizacion INT,
@IdUsrEliminacion INT,
@FechaCreacion DATETIME,
@FechaActualizacion DATETIME,
@FechaEliminacion DATETIME,
@IntentosFallidos INT
AS
BEGIN
    UPDATE Usuarios SET 
    Nombre = @Nombre,
    Apellidos = @Apellidos,
    Identificacion = @Identificacion,
    Telefono = @Telefono,
    CorreoElectronico = @CorreoElectronico,
    Estado = @Estado,
    Otp = @Otp,
    IdRol = @IdRol,
    Contrasena = @Contrasena,
    IdUsrCreacion = @IdUsrCreacion,
    IdUsrActualizacion = @IdUsrActualizacion,
    IdUsrEliminacion = @IdUsrEliminacion,
    FechaCreacion = @FechaCreacion,
    FechaActualizacion = GETDATE(),
    FechaEliminacion = @FechaEliminacion,
    IntentosFallidos = @IntentosFallidos
    WHERE Id = @ID
END