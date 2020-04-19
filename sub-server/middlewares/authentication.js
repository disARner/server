const helper = require('../helpers')
const { User } = require('../models')
module.exports = {
  authentication: (req,res,next) => {
    let {token} = req.headers
    let decoded = helper.decodedToken(token)
    User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email
      }
    })
    .then((result) => {
      next()   
    }).catch((err) => {
      next(err)
    });
  },
  authorization
}