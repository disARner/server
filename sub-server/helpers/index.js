const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  encrypt: (user) => {
    let salt = bcrypt.genSaltSync(4)
    user.password = bcrypt.hashSync(user.password, salt)
  },
  getToken: (payload) => {
    let token = jwt.sign(payload,process.env.SECRET)
    return token
  },
  comparePassword: (password, passwordDb) => {
    return bcrypt.compareSync(password, passwordDb)
  },
  decodedToken: (token) => {
    return jwt.verify(token,process.env.SECRET)
  }
}