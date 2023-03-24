CREATE TABLE [dbo].[Productos] (
    [Id]                 INT             IDENTITY (1, 1) NOT NULL,
    [Nombre]             VARCHAR (50)    NOT NULL,
    [Descripcion]        TEXT            NULL,
    [Precio]             DECIMAL (18, 2) NOT NULL,
    [FechaRegistro]      DATETIME        DEFAULT (getdate()) NOT NULL,
    [Stock_Cantidad]     INT             NOT NULL,
    [IdUsrCreacion]      INT             NOT NULL,
    [IdUsrActualizacion] INT             NULL,
    [IdUsrEliminacion]   INT             NULL,
    [FechaCreacion]      DATETIME        DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME        NULL,
    [FechaEliminacion]   DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

