const { Router } = require('express');
const { User, Product } = require('../db');
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
        await User.update({cart:[...user.cart, product]}, {where: { id:userId}})
        res.status(200).send("producto añadido al carrito de compras.")
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

router.post('/', async(req, res, next) => {//creacion de usuario
    const { name, email, password } = req.body
    try { 
        const newUser = await User.create({
            name, email, password
        })
        res.status(201).send(newUser)
    }
    catch(error){
        if(error.parent.code == 23505){
            res.status(408).send("Ya existe un usuario registrado con ese email.")
        } else {
            res.status(500).send("Algo ha salido mal, intente nuevamente.")
        }
    }
})


module.exports = router