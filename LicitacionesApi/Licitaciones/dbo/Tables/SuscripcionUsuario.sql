CREATE TABLE [dbo].[SuscripcionUsuario] (
    [Id]                 INT      IDENTITY (1, 1) NOT NULL,
    [IdUsuario]          INT      NOT NULL,
    [IdSubscripcion]     INT      NOT NULL,
    [FechaInicio]        DATETIME NOT NULL,
    [FechaFin]           DATETIME NULL,
    [Estado]             BIT      DEFAULT ((1)) NOT NULL,
    [IdUsrCreacion]      INT      NOT NULL,
    [IdUsrActualizacion] INT      NULL,
    [IdUsrEliminacion]   INT      NULL,
    [FechaCreacion]      DATETIME DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME NULL,
    [FechaEliminacion]   DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Suscripciones] FOREIGN KEY ([IdSubscripcion]) REFERENCES [dbo].[Suscripciones] ([Id]),
    CONSTRAINT [FK_Suscripciones_Usuarios] FOREIGN KEY ([IdUsuario]) REFERENCES [dbo].[Usuarios] ([Id])
);

