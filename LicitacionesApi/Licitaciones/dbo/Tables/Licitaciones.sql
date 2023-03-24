CREATE TABLE [dbo].[Licitaciones] (
    [Id]                 INT             IDENTITY (1, 1) NOT NULL,
    [IdAnalista]         INT             NOT NULL,
    [Titulo]             VARCHAR (100)   NOT NULL,
    [Descripcion]        TEXT            NOT NULL,
    [LugarEntrega]       VARCHAR (100)   NOT NULL,
    [FechaCierreOfertas] DATETIME        NOT NULL,
    [MontoPresupuestado] DECIMAL (18, 2) NOT NULL,
    [Estado]             VARCHAR (20)    DEFAULT ('Abierta') NOT NULL,
    [CodigoQR]           VARBINARY (MAX) NULL,
    [IdUsrCreacion]      INT             NOT NULL,
    [IdUsrActualizacion] INT             NULL,
    [IdUsrEliminacion]   INT             NULL,
    [FechaCreacion]      DATETIME        DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME        NULL,
    [FechaEliminacion]   DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Licitaciones_Usuarios] FOREIGN KEY ([IdAnalista]) REFERENCES [dbo].[Usuarios] ([Id])
);

