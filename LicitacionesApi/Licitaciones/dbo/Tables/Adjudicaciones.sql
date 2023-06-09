﻿CREATE TABLE [dbo].[Adjudicaciones] (
    [Id]                 INT      IDENTITY (1, 1) NOT NULL,
    [IdOferta]           INT      NOT NULL,
    [FechaAdjudicacion]  DATETIME NOT NULL,
    [IdUsuario]          INT      NOT NULL,
    [IdUsrCreacion]      INT      NOT NULL,
    [IdUsrActualizacion] INT      NULL,
    [IdUsrEliminacion]   INT      NULL,
    [FechaCreacion]      DATETIME DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME NULL,
    [FechaEliminacion]   DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Adjudicaciones_Ofertas] FOREIGN KEY ([IdOferta]) REFERENCES [dbo].[Ofertas] ([Id]),
    CONSTRAINT [FK_Adjudicaciones_Usuarios] FOREIGN KEY ([IdUsuario]) REFERENCES [dbo].[Usuarios] ([Id])
);

