Esta api fue desarrollada en NodeJs con PostgreSQL y Sequelize, debido a que no conozco la tencologia de Prisma, y por falta de tiempo no pude implementarla. 

Para inicializar el proyecyo se debe abrir una terminal situada en la carpeta donde se haya clonado el repositorio,
crear una base de datos en PostgreSQL, ejecutar el comando "NPM install" y reemplazar la URI de la base de datos en el archivo db.js (linea 6, columna 34) por la URI de la base de datos creada para correr este proyecto.

una vez realizado este proceso, basta con ejecutar el comando NPM start para correr el servidor en el entorno local.

Users (group)
    user(endpoint)

- GET: http://localhost:3000/user/:id
        Este endpoint permite adquirir toda la informacion del usuario.

    params: id del usuario

    response:
    {
        "id": id,
        "name": "name",
        "email": "email",
        "password": "password",
        "picture": "picture",
        "address": "adress",
        "cart": [Products],
        "orders": [orders],
        "createdAt": "Creation time",
        "updatedAt": "Update time"
    }




- PUT: http://localhost:3000/user/add/:id
        Este enpoint agrega el producto seleccionado al carrito del usuario. Si el producto ya se encuentra en el carrito, no se agrega.

    REQ.BODY:{
        id: id del producto a agregar,
        stock: cantidad del producto a agregar
    }

    params: id del usuario




- PUT: http://localhost:3000/user/:id
        Este endpoint permite actualizar la direccion e imagen del usuario.

    REQ.BODY: {
        picture:string,
        address:string
    } (al menos uno)

    params: id del usuario

    response:
    "user": {
        "id": id,
        "name": "name",
        "email": "email",
        "password": "password",
        "picture": "picture",
        "address": "adress",
        "cart": null,
        "orders": [orders],
        "createdAt": "Creation time",
        "updatedAt": "Update time"
    }




-POST: http://localhost:3000/user/
        Este enpoint permite el registro de un nuevo usuario.

    REQ.BODY: {
        name,
        email,
        password
    }

    response
        {
    "id": id,
    "name": "name",
    "email": "email",
    "password": "password",
    "updatedAt": "Update time",
    "createdAt": "Creation time",
    "picture": null,
    "address": null,
    "cart": null
    "orders": [orders],
    }

=======================================================================

Product(group)
    product(endpoint)

-GET: http://localhost:3000/product/
    Este enpoint devuelve todos los productos disponibles en un array.

    response
    [   {
        id: INT
        titulo: STRING,
        codigo: INT,
        editorial: STRING,
        autor: STRING,
        precio: DECIMAL(7,2)
        stock: INT
        }...
    ]




-PUT: http://localhost:3000/product/:id
    Este enpoint permite modificar manualmente el stock disponible de un producto.

    req.body:{
        stock: INT (nuevo stock del producto)
    }

    params: id del producto a modificar

    response: el objeto del producto con su stock actualizado.




-POST http://localhost:3000/product/
    Este endpoint permite crear un producto.

    req.body:{
        titulo: STRING
        codigo: INT
        autor: STRING
        precio: DECIMAL(7,2)
        editorial: STRING
        stock: INT
        distribuidor: STRING ("desconocido" por defecto1)
    }

    response: el objeto del producto creado


======================================================================

Order(group)
    order(endpoint)

-GET: http://localhost:3000/oder/:id
    Este endpoint retorna todas las ordenes que tiene un usuario.

    params: id del usuario

    response: array con las ordenes realizadas por el usuario.

-PUT http://localhost:3000/oder/:order
    Este endpoint debe ser utilizado para procesar el pago de la orden. 
    Corrobora que haya el stock solicitado por el usuario de cada uno de los productos.
    Si algun producto no esta disponible por falta de stock, responde objeto con la propiedad outOfStock, siendo esta un array con los ID de los productos de los que falta stock.
    Ej:
    {
    "outOfStock": [
        2
    ]
}

    Si todos los productos estan disponibles, actualiza el stock de cada producto y cambia el status de la orden a "pago" y responde con el mensaje "Pago registrado correctamente!"

    params: id de la orden



-POST http://localhost:3000/oder/:id
    Genera una orden con todos los productos que esten en el carrito del usuario y vacia el carrito. 

    params: id del usuario

    response: Objeto con los detalles de la orden.