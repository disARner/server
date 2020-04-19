const { Item } = require('../models')

class ItemController {
  static async createItem (req,res,next) {
    try {
      const { name, stock, imageUrl, CategoryId } = req.body
      let { price } = req.body
      price = Number(price)
      const result = await Item.create({
        name, price, stock, imageUrl, CategoryId
      })
      res.status(200).json(result.dataValues)
    }
    catch(err) {
      next(err)
    }
  }

  static async findItem (req,res,next) {
    const result = await Item.findAll()
    res.status(200).json(result)
  }

  static async updateItem (req,res,next) {
    try {
      const { id } = req.params
      const { name, stock, imageUrl } = req.body
      let { price } = req.body
      price = Number(price)
      const result = await Item.update({
        name, price, stock, imageUrl
      }, { where: { id } })
      res.status(200).json({ status: 200, message: 'Success Update' })
    }
    catch(err) {
      next(err)
    }
  }

  static async deleteItem (req,res,next) {
    try{
      const { id } = req.params
      const result = await Item.destroy({
        where: { id }
      })
      res.status(200).json({ status: 200, message: "Success Delete" })
    }
    catch(err) {
      next({ status: 404, message: 'Data Not Found' })
    }
  }
}

module.exports = ItemController