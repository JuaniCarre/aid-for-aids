const { Router } = require('express');
const { User, Product } = require('../db');
const bcryptjs = require('bcryptjs')
const router = Router()

router.get('/:id', async(req, res) => {//detalle del usuario.
    const user = await User.findByPk(req.params.id)
    try{
        if(user){
            return res.status(200).send(user)
        }
    throw new Error("user not found")
    }catch(error) {
        res.status(500).send(error.message)
    }
})

router.put("/add/:id", async(req, res) => {//añadir item al carrito
    const { id, stock} = req.body
    const userId = req.params.id
    try{
        const product = await Product.findByPk(id)
        product.stock = stock
        const user = await User.findByPk(userId)
        const duplicate = user.cart.find(e=>e.id === id)
        if(!duplicate){
            await User.update({cart:[...user.cart, product]}, {where: { id:userId}})
            res.status(200).send("producto añadido al carrito de compras.")
        } else {
            res.status(200).send("Este producto ya se encuentra en el carrito de compras.")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put("/:id", async (req, res) => {//editar direccion e imagen.
    const userId = req.params.id

    try{
        if(req.body.picture !=undefined || req.body.address != undefined){
            await User.update(req.body, {
                where: { id: userId }})

            const userUpdated = await User.findByPk(userId)
            if(userUpdated !=null){
                return res.status(200).json(userUpdated)
            }
        }
        throw new Error('user not found');
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/register', async(req, res, next) => {//creacion de usuario
    const { name, email, password } = req.body
    const passwordHash = await bcryptjs.hash(password, 8)
    try { 
        const newUser = await User.create({
            name, email, password:passwordHash
        })
        res.status(201).send(newUser)
    }
    catch(error){
            res.status(500).send(error.message)
        }
    }
)


module.exports = router