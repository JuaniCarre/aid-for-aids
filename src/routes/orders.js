const { Router } = require('express');
const { User, Product, Order } = require('../db');
const router = Router()

router.get("/:id", async(req, res) => { //trae las ordenes del usuario
    const userId = req.params.id
    const user = await User.findByPk(userId)
    res.send(user)
})

router.put('/:order', async(req, res) =>{//verifica el pago de la orden, comprueba el stock disponible y descuenta del stock los productos comprados.
    const orderId = req.params.order
    const order = await Order.findByPk(orderId)
    const completeOrder = await order.dataValues.items
    let flag = true
    completeOrder.forEach(async e => {
        const producto = await Product.findByPk(e.id)
        if(e.stock > producto.stock){
            flag = false
        } else {
            await producto.update(stock=producto.stock-e.stock)
            console.log(producto)
        }
    })
    res.send("ok")
})

router.post("/:id", async(req, res) => {//genera una orden a partir del carrito y elimina el carrito actual.
    const userId = req.params.id
    const user = await User.findByPk(userId)
    const newOrder = await Order.create({items:user.cart, userId: userId, address:user.address})
    user.update({orders:[...user.orders, newOrder], cart:[]})
    res.send(newOrder)
})



module.exports = router