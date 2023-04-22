CREATE procedure SP_CrearPago
@IdUsuario Int,
@Monto decimal(18,2),
@Descripcion varchar(200),
@Estado bit,
@IdUserCreacion int

as
begin
	set nocount on;

	insert into PagosUsuario (IdUsuario,Monto,Descripcion,Estado,IdUsrCreacion,FechaCreacion)
	values (@IdUsuario,@Monto,@Descripcion,@Estado,@IdUserCreacion,GETDATE());

	end