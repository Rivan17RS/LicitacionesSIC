CREATE TABLE [dbo].[StockProductos] (
    [Id]                 INT             IDENTITY (1, 1) NOT NULL,
    [IdUsuario]          INT             NOT NULL,
    [IdProducto]         INT             NOT NULL,
    [Cantidad]           INT             NOT NULL,
    [PrecioUnidad]      DECIMAL (18, 2) NOT NULL,
    [IdUsrCreacion]      INT             NOT NULL,
    [IdUsrActualizacion] INT             NULL,
    [IdUsrEliminacion]   INT             NULL,
    [FechaCreacion]      DATETIME        DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME        NULL,
    [FechaEliminacion]   DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Stock_Productos_Licitaciones] FOREIGN KEY ([IdUsuario]) REFERENCES [dbo].[Usuarios] ([Id]),
    CONSTRAINT [FK_Stock_Productos_Productos] FOREIGN KEY ([IdProducto]) REFERENCES [dbo].[Productos] ([Id])
);

