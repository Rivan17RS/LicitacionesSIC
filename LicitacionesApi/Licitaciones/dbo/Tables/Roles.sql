CREATE TABLE [dbo].[Roles] (
    [Id]                 INT          IDENTITY (1, 1) NOT NULL,
    [Nombre]             VARCHAR (25) NOT NULL,
    [Estado]             BIT          DEFAULT ((1)) NOT NULL,
    [IdUsrCreacion]      INT          NOT NULL,
    [IdUsrActualizacion] INT          NULL,
    [IdUsrEliminacion]   INT          NULL,
    [FechaCreacion]      DATETIME     DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME     NULL,
    [FechaEliminacion]   DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

