CREATE TABLE [dbo].[DetalleOfertas]
(
	[Id]                 INT             NOT NULL           IDENTITY (1, 1), 
    [IdOferta]           INT             NOT NULL, 
    [IdProducto]         INT             NOT NULL, 
    [Cantidad]           INT             NOT NULL,
    [IdUsrCreacion]      INT             NOT NULL,
    [IdUsrActualizacion] INT             NULL,
    [IdUsrEliminacion]   INT             NULL,
    [FechaCreacion]      DATETIME        DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME        NULL,
    [FechaEliminacion]   DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),

    CONSTRAINT [FK_DetalleOfertas_Licitaciones] FOREIGN KEY ([IdOferta]) REFERENCES [dbo].[Licitaciones] ([Id]),


)
