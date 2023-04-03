CREATE TABLE [dbo].[Usuarios] (
    [Id]                 INT           IDENTITY (1, 1) NOT NULL,
    [Nombre]             VARCHAR (50)  NOT NULL,
    [Apellidos]          VARCHAR (50)  NOT NULL,
    [Identificacion]     VARCHAR (20)  NOT NULL,
    [Telefono]           VARCHAR (20)  NOT NULL,
    [CorreoElectronico]  VARCHAR (100) NOT NULL,
    [Estado]             BIT           DEFAULT ((1)) NOT NULL,
    [Otp]                VARCHAR (15)  NOT NULL,
    [IdRol]              INT           NOT NULL,
    [Contrasena]         VARCHAR (100)  NOT NULL,
    [IdUsrCreacion]      INT           NOT NULL,
    [IdUsrActualizacion] INT           NULL,
    [IdUsrEliminacion]   INT           NULL,
    [FechaCreacion]      DATETIME      DEFAULT (getdate()) NULL,
    [FechaActualizacion] DATETIME      NULL,
    [FechaEliminacion]   DATETIME      NULL,
    [IntentosFallidos]   INT           DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Usuarios_Roles] FOREIGN KEY ([IdRol]) REFERENCES [dbo].[Roles] ([Id])
);



