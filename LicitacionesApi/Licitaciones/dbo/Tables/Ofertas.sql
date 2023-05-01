CREATE TABLE [dbo].[Ofertas] (
    [Id]                 INT             IDENTITY (1, 1) NOT NULL,
    [IdUsuario]          INT             NOT NULL,
    [IdLicitacion]       INT             NOT NULL,
    [FechaEntrega]       DATETIME        NOT NULL,
    [MontoTotal]         DECIMAL (18, 2) NOT NULL,
    [IdUsrCreacion]      INT             NOT NULL,
    [IdUsrActualizacion] INT             NULL,
    [IdUsrEliminacion]   INT             NULL,
    [FechaCreacion]      DATETIME        DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME        NULL,
    [FechaEliminacion]   DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Ofertas_Licitaciones] FOREIGN KEY ([IdLicitacion]) REFERENCES [dbo].[Licitaciones] ([Id]),
    CONSTRAINT [FK_Ofertas_Usuarios] FOREIGN KEY ([IdUsuario]) REFERENCES [dbo].[Usuarios] ([Id])
);

