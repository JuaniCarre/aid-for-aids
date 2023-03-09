const { Router } = require('express');
const { User, Product, Order } = require('../db');
const router = Router()

router.get("/:id", async(req, res) => { //trae las ordenes del usuario
    const userId = req.params.id
    const user = await User.findByPk(userId)
    res.send(user.orders)
})

router.put('/:order', async(req, res) =>{//verifica el pago de la orden, comprueba el stock disponible y descuenta del stock los productos comprados.
    const orderId = req.params.order
    const order = await Order.findByPk(orderId)
    const completeOrder = await order.dataValues.items
    let comparador = []

    for (const e of completeOrder) {//corrobora stock
        const inventory = await Product.findByPk(e.id)
    
        const item = {
            id: e.id,
            stock: e.stock,
            available: true
        }
    
        if(item.stock <= inventory.dataValues.stock){
            comparador = [...comparador, item]
        } else {
            item.available=false

            comparador = [...comparador, item]
        }
    }
    const outOfStock = comparador.filter(e => e.available == false)

    if(outOfStock.length>0){//si algun producto no esta disponible
        const ids = outOfStock.map(e=>e.id)
        res.send({outOfStock: ids}).status(200)//envia un array con los Id de los productos no disponibles
    } else {
        //Aqui se deberia procesar el pago. Si es exitoso =>
        order.update({status:"pago"})
        for(const e of comparador) {//descuenta stock
            const bought = await Product.findByPk(e.id)//encuentra individualmente cada producto en la orden
            const newStock = (bought.stock - e.stock)//calcula el nuevo stock
            await bought.update({stock:newStock}, {where:{id:e.id}})//actualiza el stock en DB
        }
        res.send("Pago registrado correctamente!").status(200)
    }
})

router.post("/:id", async(req, res) => {//genera una orden a partir del carrito y elimina el carrito actual.
    const userId = req.params.id
    const user = await User.findByPk(userId)
    if(user.cart.length>0){
        const newOrder = await Order.create({items:user.cart, userId: userId, address:user.address})
        user.update({orders:[...user.orders, newOrder], cart:[]})
        res.send(newOrder)
    } else {
        res.status(200).send("El usuario no tiene productos en su carrito")
    }
})



module.exports = router