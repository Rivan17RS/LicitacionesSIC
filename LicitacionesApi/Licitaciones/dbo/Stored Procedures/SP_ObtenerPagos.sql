	create procedure SP_ObtenerPagos 
		as
		begin
			set nocount on;

			select Id, IdUsuario, Monto, Estado, IdUsrCreacion, IdUsrActualizacion, IdUsrEliminacion, FechaCreacion, FechaActualizacion, FechaEliminacion, Descripcion
			from PagosUsuario
		end