const { User } = require('../models')
const { getToken, comparePassword } = require('../helpers')
class UserController {
  static async register (req,res,next) {
    try {
      const { username, password, email } = req.body
      let { role } = req.body
      if (!role) {
        role = 'user'
      }
      const data = await User.create({
        username, password, email, role
      })
      res.status(201).json({ status: 201, message: 'Success Register' })
    }
    catch (err) {
      next(err)
    }
  }

  static async login (req,res,next) {
    console.log(req.body,"<<<<<<<<<<<<<<<<< USER CONTROLLER LOGIN")
    try {
      const { password, email } = req.body
      
      const data = await User.findOne({
        where: { email }
      })
      if (data) {
        const { id, username } = data.dataValues
        const passwordDb = data.dataValues.password
        let compared = comparePassword(password,passwordDb)
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
    catch (err) {
      next(err)
    }
  }
}

module.exports = UserController