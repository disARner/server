const { Category, Item } = require('../models')

class CategoryController {

  static async createCategory (req,res,next) {
    const { name } = req.body
    const result = await Category.create({
      name
    })
    res.status(201).json(result.dataValues)
  }

  static async findCategory (req,res,next) {
    const result = await Category.findAll({include: [{model: Item}]})
    res.status(200).json(result)
  }

  static async findByIdCategory (req,res,next) {
    try{
      const { id } = req.params
      const result = await Category.findOne({ where: { id }, include: [{model: Item}] })
      res.status(200).json(result.dataValues)
    }
    catch(err) {
      next(err)
    }
  }

}

module.exports = CategoryController