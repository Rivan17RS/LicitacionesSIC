create procedure SP_EliminarPago
	@IdPago int
	as
	begin
	set nocount on;
	DELETE from PagosUsuario
	where Id = @IdPago;

	end