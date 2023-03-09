const express = require('express');
const app = express();
const {conn} = require('./db.js')

//middlewares
app.use(express.json());

//rutas

//conexion con DB
conn.sync().then(() => {
    app.listen(3000, () => {
        console.log("app listening port 3000...")
    })
})




