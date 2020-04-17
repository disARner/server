const routers = require('express').Router()
const UserController = require('../controllers/userController')

routers.post('/login', UserController.login)
routers.post('/register', UserController.register)

module.exports = routers