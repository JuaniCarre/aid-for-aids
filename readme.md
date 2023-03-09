Users (group)
user(endpoint)

- GET: http://localhost:3000/user/:id
    response:
    {
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

- PUT: http://localhost:3000/user/:id
    REQ.BODY: {
        picture:string,
        address:string
    } (al menos uno)

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
    