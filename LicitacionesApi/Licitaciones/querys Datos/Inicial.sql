﻿DBCC CHECKIDENT (Roles, RESEED,0)

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


INSERT INTO Productos (Nombre, Descripcion, Precio, FechaRegistro, Stock_Cantidad, IdUsrCreacion, FechaCreacion)
VALUES 
('Leche', 'Leche entera pasteurizada enriquecida con vitaminas', 2.99, getdate(), 100, 1, getdate()),
('Queso', 'Queso semiduro de leche de vaca', 4.50, getdate(), 50, 1, getdate()),
('Yogurt', 'Yogurt natural bajo en grasas', 1.75, getdate(), 200, 1, getdate()),
('Carne de res', 'Carne de res fresca sin hueso', 8.99, getdate(), 30, 1, getdate()),
('Pollo', 'Pollo fresco cortado en trozos', 5.25, getdate(), 40, 1, getdate()),
('Pescado', 'Filetes de pescado fresco', 7.75, getdate(), 20, 1, getdate()),
('Pan integral', 'Pan integral recién horneado', 3.25, getdate(), 80, 1, getdate()),
('Huevos', 'Huevos frescos de gallinas libres de jaula', 2.50, getdate(), 120, 1, getdate()),
('Frijoles', 'Frijoles negros cocidos y enlatados', 1.99, getdate(), 150, 1, getdate()),
('Arroz', 'Arroz integral de grano largo', 4.75, getdate(), 100, 1, getdate());
