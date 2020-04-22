const express = require('express')
const app = express()
const routesUser = require('./routes/user')
const routesCartItem = require('./routes/cartItem')
const routesCategory = require('./routes/category')
const routesItem = require('./routes/item');
const { errorHandler } = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routesUser)
app.use(routesCartItem)
app.use(routesCategory)
app.use(routesItem)

app.use(errorHandler)

module.exports = app