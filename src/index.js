const express = require('express');
const userRouter = require("./routes/users")
const productRouter = require("./routes/products")
const orderRouter = require("./routes/orders")
const app = express();
const {conn} = require('./db.js')

//middlewares
app.use(express.json());

//rutas
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)

//conexion con DB
conn.sync({force:false}).then(() => {
    app.listen(3000, () => {
        console.log("app listening port 3000...")
    })
})




