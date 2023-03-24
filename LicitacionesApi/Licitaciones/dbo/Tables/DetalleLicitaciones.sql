CREATE TABLE [dbo].[DetalleLicitaciones] (
    [Id]                 INT      IDENTITY (1, 1) NOT NULL,
    [IdLicitacion]       INT      NOT NULL,
    [IdProducto]         INT      NOT NULL,
    [Cantidad]           INT      NOT NULL,
    [IdUsrCreacion]      INT      NOT NULL,
    [IdUsrActualizacion] INT      NULL,
    [IdUsrEliminacion]   INT      NULL,
    [FechaCreacion]      DATETIME DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME NULL,
    [FechaEliminacion]   DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DetalleLicitaciones_Licitaciones] FOREIGN KEY ([IdLicitacion]) REFERENCES [dbo].[Licitaciones] ([Id]),
    CONSTRAINT [FK_DetalleLicitaciones_Productos] FOREIGN KEY ([IdProducto]) REFERENCES [dbo].[Productos] ([Id])
);

