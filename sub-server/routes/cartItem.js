const router = require('express').Router()
const CartController = require('../controllers/cartController')

router.get('/cart', CartController.findCart)
router.post('/cart', CartController.createCart)
router.put('/cart', CartController.editCart)
router.delete('/cart/:id', CartController.deleteCart)

module.exports = router