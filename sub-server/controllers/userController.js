const { User, Cart, sequelize } = require('../models')
const { getToken, comparePassword } = require('../helpers')

class UserController {
  static async register (req,res,next) {
    const { username, password, email } = req.body
    const transaction = await sequelize.transaction()
    try {
      const data = await User.create({
        username, password, email, role:'user'
      }, { transaction })

      await Cart.create({
        UserId: data.dataValues.id
      }, { transaction })

      await transaction.commit()

      res.status(201).json({ status: 201, message: 'Success Register' })
    }
    catch (err) {
      // console.log(err,"<<<<<<<<<<<<<<<<<<<<<< ERR CONTROLLER REG")
      await transaction.rollback()
      next(err)
    }
  }

  static async login (req,res,next) {
    const { password, email } = req.body
    const data = await User.findOne({
      where: { email }
    })
    if (data) {
      const { id, username } = data.dataValues
      const passwordDb = data.dataValues.password
      let compared = comparePassword(password, passwordDb)
      if (compared) {
        let token = getToken({id, email, username})
        res.status(200).json({ token, username })
      } else {
        next({ status: 400, message: 'Email or Password wrong' })
      }
    } else {
      next({ status: 400, message: 'Email or Password wrong' })
    }
  }
}

module.exports = UserController