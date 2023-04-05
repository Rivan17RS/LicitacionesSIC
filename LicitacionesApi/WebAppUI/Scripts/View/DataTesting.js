var Products = [
    {
        "Id": 1,
        "Nombre": "Leche(l)",
        "Descripcion": "Leche entera pasteurizada enriquecida con vitaminas",
        "Precio": 2.99,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 100,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 2,
        "Nombre": "Queso(kg)",
        "Descripcion": "Queso semiduro de leche de vaca",
        "Precio": 4.50,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 50,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 3,
        "Nombre": "Yogurt(l)",
        "Descripcion": "Yogurt natural bajo en grasas",
        "Precio": 1.75,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 200,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 4,
        "Nombre": "Carne de res(kg)",
        "Descripcion": "Carne de res fresca sin hueso",
        "Precio": 8.99,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 30,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 5,
        "Nombre": "Pollo(und)",
        "Descripcion": "Pollo fresco cortado en trozos",
        "Precio": 5.25,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 40,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 6,
        "Nombre": "Pescado(kg)",
        "Descripcion": "Filetes de pescado fresco",
        "Precio": 7.75,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 20,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 7,
        "Nombre": "Pan integral(und)",
        "Descripcion": "Pan integral recién horneado",
        "Precio": 3.25,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 80,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 8,
        "Nombre": "Huevos(und)",
        "Descripcion": "Huevos frescos de gallinas libres de jaula",
        "Precio": 2.50,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 120,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 9,
        "Nombre": "Frijoles(kg)",
        "Descripcion": "Frijoles negros cocidos y enlatados",
        "Precio": 1.99,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 150,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    },
    {
        "Id": 10,
        "Nombre": "Arroz(kg)",
        "Descripcion": "Arroz integral de grano largo",
        "Precio": 4.75,
        "FechaRegistro": "2023-04-01T18:35:00",
        "Stock_Cantidad": 100,
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00"
    }
]

var producto_user = [
    {
        "Id": 3,
        "Nombre": "Yogurt(l)",
        "Descripcion": "Yogurt natural bajo en grasas",
        "Precio": 1.75,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "zachary.hernandez.valverde@gmail.com",
        "cantidad": 5
    },
    {
        "Id": 4,
        "Nombre": "Carne de res(kg)",
        "Descripcion": "Carne de res fresca sin hueso",
        "Precio": 8.99,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "dsalazarc@ucenfotec.ac.cr",
        "cantidad": 10
    },
    {
        "Id": 5,
        "Nombre": "Pollo(und)",
        "Descripcion": "Pollo fresco cortado en trozos",
        "Precio": 5.25,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "zachary.hernandez.valverde@gmail.com",
        "cantidad": 2
    },
    {
        "Id": 6,
        "Nombre": "Pescado(kg)",
        "Descripcion": "Filetes de pescado fresco",
        "Precio": 7.75,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "dsalazarc@ucenfotec.ac.cr",
        "cantidad": 7
    },
    {
        "Id": 7,
        "Nombre": "Pan integral(und)",
        "Descripcion": "Pan integral recién horneado",
        "Precio": 3.25,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "zachary.hernandez.valverde@gmail.com",
        "cantidad": 1
    },
    {
        "Id": 8,
        "Nombre": "Huevos(und)",
        "Descripcion": "Huevos frescos de gallinas libres de jaula",
        "Precio": 2.50,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "dsalazarc@ucenfotec.ac.cr",
        "cantidad": 50
    },
    {
        "Id": 9,
        "Nombre": "Frijoles(kg)",
        "Descripcion": "Frijoles negros cocidos y enlatados",
        "Precio": 1.99,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "zachary.hernandez.valverde@gmail.com",
        "cantidad": 25
    },
    {
        "Id": 10,
        "Nombre": "Arroz(kg)",
        "Descripcion": "Arroz integral de grano largo",
        "Precio": 4.75,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "dsalazarc@ucenfotec.ac.cr",
        "cantidad": 10
    },
    {
        "Id": 9,
        "Nombre": "Frijoles(kg)",
        "Descripcion": "Frijoles negros cocidos y enlatados",
        "Precio": 1.99,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "zachary.hernandez.valverde@gmail.com",
        "cantidad": 25
    },
    {
        "Id": 10,
        "Nombre": "Arroz(kg)",
        "Descripcion": "Arroz integral de grano largo",
        "Precio": 4.75,
        "FechaRegistro": "2023-04-01T18:35:00",
        "IdUsrCreacion": 1,
        "FechaCreacion": "2023-04-01T18:35:00",
        "userId": "dsalazarc@ucenfotec.ac.cr",
        "cantidad": 10
    }
]
