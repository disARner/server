const router = require('express').Router()
const ItemController = require('../controllers/itemController');

router.get('/item',ItemController.findItem)
router.post('/item',ItemController.createItem)
router.put('/item/:id',ItemController.updateItem)
router.delete('/item/:id', ItemController.deleteItem)

module.exports = router