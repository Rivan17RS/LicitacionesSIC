	create procedure SP_ObtenerPagosId
		@IdUser int 
		as
		begin
			set nocount on;

			select Id, IdUsuario, Monto, Estado, IdUsrCreacion, IdUsrActualizacion, IdUsrEliminacion, FechaCreacion, FechaActualizacion, FechaEliminacion, Descripcion
			from PagosUsuario
			where IdUsuario = @IdUser;

		end