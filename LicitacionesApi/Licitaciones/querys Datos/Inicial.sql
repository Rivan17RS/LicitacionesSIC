DBCC CHECKIDENT (Roles, RESEED,0)

USE [LicitacionesDB]
GO

INSERT INTO [dbo].[Roles]
           ([Nombre]
           ,[Estado]
           ,[IdUsrCreacion])
     VALUES
           ('Admin',
           1,
           0)
GO

INSERT INTO [dbo].[Roles]
           ([Nombre]
           ,[Estado]
           ,[IdUsrCreacion])
     VALUES
           ('Analist',
           1,
           1)
GO

INSERT INTO [dbo].[Roles]
           ([Nombre]
           ,[Estado]
           ,[IdUsrCreacion])
     VALUES
           ('User',
           1,
           1)
GO

DBCC CHECKIDENT (Usuarios, RESEED,0)

USE [LicitacionesDB]
GO

INSERT INTO [dbo].[Usuarios]
           ([Nombre]
           ,[Apellidos]
           ,[Identificacion]
           ,[Telefono]
           ,[CorreoElectronico]
           ,[Estado]
           ,[Otp]
           ,[IdRol]
           ,[Contrasena]
           ,[IdUsrCreacion])

     VALUES
           ('Admin'
           ,'Admin'
           ,'123456'
           ,'24000000'
           ,'admin@gmail.com'
           ,1
           ,'123456'
           ,1
           ,1234
           ,0)
GO


