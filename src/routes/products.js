const { Router } = require('express');
const { User, Product, Order } = require('../db');
const router = Router()

router.get('/', async(req, res) => {
    const products = await Product.findAll()
    res.status(200).send(products)
})

router.put("/:id", async(req, res) => {
    const { stock } = req.body
    const productId = req.params.id

    try{
        await Product.update({stock:stock}, {
            where:{ id: productId }
        })

        const stockUpdated = await Product.findByPk(productId)
        res.status(200).send(stockUpdated)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/', async(req, res) => {
    const { titulo, codigo, autor, precio, editorial, stock, distribuidor } = req.body
    const product = await Product.create({ titulo, codigo, autor, precio, editorial, stock, distribuidor})
    res.status(200).send(product)
})


module.exports = router