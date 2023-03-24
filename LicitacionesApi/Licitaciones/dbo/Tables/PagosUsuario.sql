CREATE TABLE [dbo].[PagosUsuario] (
    [Id]                 INT             IDENTITY (1, 1) NOT NULL,
    [IdUsuario]          INT             NOT NULL,
    [Monto]              DECIMAL (18, 2) NOT NULL,
    [Estado]             BIT             DEFAULT ((1)) NOT NULL,
    [IdUsrCreacion]      INT             NOT NULL,
    [IdUsrActualizacion] INT             NULL,
    [IdUsrEliminacion]   INT             NULL,
    [FechaCreacion]      DATETIME        DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME        NULL,
    [FechaEliminacion]   DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Pagos_Usuarios] FOREIGN KEY ([IdUsuario]) REFERENCES [dbo].[Usuarios] ([Id])
);

