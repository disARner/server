const helper = require('../helpers')
const { User, Cart } = require('../models')
module.exports = {
  authentication: async (req,res,next) => {
    try {
      const {token} = req.headers
      const decoded = helper.decodedToken(token)
      console.log(decoded.id,"<<<<<<<<<<< AUTH")
      const user = await User.findOne({
        where: {
          id: +decoded.id,
          email: decoded.email
        },
        include: Cart
      })
      console.log(decoded.id,"<<<< DECODED ID")
      console.log(user.id,"<<<<<< USER ID")
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
      console.log(error,"<<<<<<<<<<<<<<<<<<<<<<<<< ERROR AUTHEN")
      next (error)
    }
  }
}