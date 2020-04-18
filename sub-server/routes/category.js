const router = require('express').Router()
const CategoryController = require('../controllers/categoryController');

router.get('/category',CategoryController.findCategory)
router.get('/category/:id',CategoryController.findByIdCategory)

module.exports = router