const router = require('express').Router()
const CartItemController = require('../controllers/cartItemController')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)
router.get('/cart', CartItemController.findCartItem)
router.post('/cart', CartItemController.createCartItem)
router.put('/cart/checkout', CartItemController.checkout)
router.get('/cart/history', CartItemController.history)
router.put('/cart/:id', CartItemController.updateCartItem)
router.delete('/cart/:id', CartItemController.deleteCartItem)

module.exports = router