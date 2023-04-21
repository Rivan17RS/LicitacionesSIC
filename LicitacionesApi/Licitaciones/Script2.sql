create procedure SP_CrearPago
@IdUsuario Int,
@Monto decimal(18,2),
@Descripcion varchar(200),
@Estado bit,
@IdUserCreacion int

as
begin
	set nocount on;

	insert into PagosUsuario (IdUsuario,Monto,Descripcion,Estado,IdUsrCreacion)
	values (@IdUsuario,@Monto,@Descripcion,@Estado,@IdUserCreacion);

	end
	go

create procedure SP_EliminarPago
	@IdPago int
	as
	begin
	set nocount on;
	DELETE from PagosUsuario
	where Id = @IdPago;

	end
	go


	create procedure SP_ObtenerPagosId
		@IdUser int 
		as
		begin
			set nocount on;

			select Id, IdUsuario, Monto, Estado, IdUsrCreacion, IdUsrActualizacion, IdUsrEliminacion, FechaCreacion, FechaActualizacion, FechaEliminacion, Descripcion
			from PagosUsuario
			where IdUsuario = @IdUser;

		end
		go


	create procedure SP_ObtenerPagos 
		as
		begin
			set nocount on;

			select Id, IdUsuario, Monto, Estado, IdUsrCreacion, IdUsrActualizacion, IdUsrEliminacion, FechaCreacion, FechaActualizacion, FechaEliminacion, Descripcion
			from PagosUsuario
		end
		go