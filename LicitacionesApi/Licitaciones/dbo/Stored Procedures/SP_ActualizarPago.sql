
	CREATE procedure SP_ActualizarPago
		@IdPago INT,
		@IdUsuario int,
		@Monto DECIMAL(18,2),
		@Estado BIT,
		@Descripcion VARCHAR(200),
		@IdUsrActualizacion INT

		as
		begin 
			set nocount on;

			update PagosUsuario
			set IdUsuario = @IdUsuario,
			Monto = @Monto,
			Estado = @Estado,
			Descripcion = @Descripcion,
			IdUsrActualizacion = @IdUsrActualizacion,
			FechaActualizacion = getdate()
		where Id = @IdPago;
		end