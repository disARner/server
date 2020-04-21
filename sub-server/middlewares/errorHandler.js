module.exports = {
  errorHandler(err,req,res,next) {
    console.log(err)
    if(err.name == "SequelizeValidationError") {
      let errorMessage = err.errors.map(el => el.message)
      res.status(400).json({
        status:400,
        message:errorMessage
      })
    }
    else {
      if(err.status) {
        res.status(err.status).json({
          status:err.status,
          message:err.message
        })
      }else{
        res.status(500).json({
          status:500,
          message:'Internal Server Error'
        })
      }
    }
  }
}