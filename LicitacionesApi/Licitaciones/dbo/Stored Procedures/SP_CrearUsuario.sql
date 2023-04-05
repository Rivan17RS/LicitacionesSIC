CREATE PROCEDURE SP_CrearUsuario
	-- Add the parameters for the stored procedure here
	@Nombre varchar(50),
	@Apellidos varchar(50),
	@Identificacion varchar(20),
	@Telefono varchar(20),
	@CorreoElectronico varchar(100),
	@Estado bit,
	@Otp varchar(15),
	@IdRol int,
	@Contrasena varchar(100),
	@IdusrCreacion int


AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    insert into [dbo].[Usuarios]
	(
	[Nombre],[Apellidos],[Identificacion],[Telefono],
	[CorreoElectronico],[Estado],[Otp],[IdRol],[Contrasena]
	,[IdUsrCreacion]
	)
	values
	(
	
	@Nombre,
	@Apellidos,
	@Identificacion,
	@Telefono,
	@CorreoElectronico,
	@Estado,
	@Otp,
	@IdRol,
	@Contrasena,
	@IdusrCreacion
	
	)
END