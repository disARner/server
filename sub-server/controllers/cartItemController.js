const { Cart, Item, CartItem, sequelize } = require('../models')
class CartItemController {
  static async createCartItem (req,res,next) {
    const { ItemId, quantity } = req.body
    const CartId = +req.currentCart
    const transaction = await sequelize.transaction()
    try{
      //using findOrCreate sequelize function
      const data = await CartItem.findOrCreate({
        where: {
          CartId, 
          ItemId, 
          isPaid: false
        },
        defaults: { //the defaults input if data not found
          CartId, 
          ItemId, 
          isPaid: false,
          quantity
        },
        transaction
      })
      //if data already exists
      if (!data[1]) {
        await CartItem.increment(
          ['quantity'],
          {
            by: quantity,
            where: { CartId, ItemId },
            transaction
          }
        )
      }
      await transaction.commit()
      res.status(201).json({ status: 201, message: 'Add Cart successful' })
    }
    catch(err) {
      await transaction.rollback()
      next(err)
    }
  }

  static async findCartItem (req,res,next) {
    const UserId = +req.curentUserId
    const cart = await Cart.findOne({
      where: { UserId },
      include: [{
        model: CartItem,
        order: [['id']],
        where: { isPaid: false },
        include: Item
      }]
    })
    res.status(200).json(cart)
  }

  static async updateCartItem (req,res,next) {
    const CartId = req.currentCart
    const ItemId = req.params.itemId
    const { quantity } = req.body
    try {
      await CartItem.update({ quantity }, 
        {
          where: { 
            ItemId,
            CartId,
            isPaid: false
          }
        })
      res.status(200).json({ status: 200, message: 'Update Cart Successful' })
    } catch (error) {
      next(error)
    }
  }

  static async deleteCartItem (req,res,next) {
    const CartId = req.currentCart
    const ItemId = req.params.itemId
    await CartItem.destroy({
      where: {
        ItemId,
        CartId,
        isPaid: false
      }
    })
    res.status(200).json({ status: 200, message: 'Delete Cart successful' })
  }

  static async checkout (req, res, next) {
    const CartId = +req.currentCart
    const transaction = await sequelize.transaction()
    try {
      //changing all cart status to paid
      const data = await CartItem.update({ isPaid: true },
        {
          where: {
            CartId,
            isPaid: false
          },
          returning: true,
          transaction
        })
        //if no data found in cart
      if (!data[0]) {
        throw {
          status: 400,
          message: 'No item in Cart'
        }
      } else {
        //decreasing all item stock with sequelize function decrement
        const cartItems = data[1]
        Promise.all(cartItems.map(async cartItem => {
          await item.decrement(['stock'], {
            where: { id: cartItem.ItemId },
            by: cartItem.quantity,
            transaction
          })
        }))
        await transaction.commit()
        return res.status(200).json({ status: 200, message: 'Checkout successful' })
      }
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }

  static async history (req, res, next) {
    const UserId = +req.curentUserId
    try {
      const cart = await Cart.findOne({
        where: { UserId },
        include: [
          {
            model: CartItem,
            where: { isPaid: true },
            include: Item
          }
        ]
      })
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartItemController