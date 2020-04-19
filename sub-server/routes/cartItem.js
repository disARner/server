const router = require('express').Router()
const CartItemController = require('../controllers/cartItemController')
const { authentication } = require('../middlewares/authentication')

router.get('/cart', authentication, CartItemController.findCartItem)
router.post('/cart', authentication, CartItemController.createCartItem)
router.put('/cart/checkout', authentication, CartItemController.checkout)
router.get('/cart/history', authentication, CartItemController.history)
router.put('/cart/:itemId', authentication, CartItemController.updateCartItem)
router.delete('/cart/:itemId', authentication, CartItemController.deleteCartItem)

module.exports = router