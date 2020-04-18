const { CartItem } = require('../models')
class CartItemController {
  static async createCartItem (req,res,next) {
    try{
      const { CartId, ItemId, quantity } = req.body
      const data = await CartItem.create({
        CartId, ItemId, isPaid: false, quantity
      })
      res.status(201).json(data)
    }
    catch(err) {
      next(err)
    }
  }

  static findCartItem (req,res,next) {
    
  }

  static updateCartItem (req,res,next) {

  }

  static deleteCartItem (req,res,next) {
    
  }
}

module.exports = CartItemController