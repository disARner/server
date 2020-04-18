const router = require('express').Router()
const CartItemController = require('../controllers/cartItemController')

router.get('/cart', CartItemController.findCartItem)
router.post('/cart', CartItemController.createCartItem)
router.put('/cart', CartItemController.updateCartItem)
router.delete('/cart/:id', CartItemController.deleteCartItem)

module.exports = router