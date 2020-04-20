const helper = require('../helpers')
const { User, Cart } = require('../models')
module.exports = {
  authentication: async (req,res,next) => {
    try {
      const {token} = req.headers
      const decoded = helper.decodedToken(token)
      const user = await User.findOne({
        where: {
          id: +decoded.id,
          email: decoded.email
        },
        include: Cart
      })
      if (!user) throw {
        status: 401,
        message: 'Please login properly'
      }
      else {
        req.currentUserId = user.id
        req.currentCart = user.Cart.id
        next()
      }
    } catch (error) {
      next (error)
    }
  }
}