const { describe } = require('mocha')
const chai = require('chai')
const { expect } = chai
const { sequelize, Item, Category } = require('../models')
const { queryInterface } = sequelize

describe('Item DB TEST', () => {

  beforeEach((done) => {
    Category.create({
      name: 'shirt'
    })
    .then(_ => done())
    .catch(err => done(err));
  })

  after((done) => {
    queryInterface.bulkDelete('Items', null, {})
    .then(_ => done())
    .catch((err) => done(err))
  })
  
  afterEach((done) => {
    queryInterface.bulkDelete('Categories', null, {})
    .then(_ => done())
    .catch((err) => done(err))
  })

  describe('Success create Item to DB', () => {
    it('Should return data item when user success input item', (done) => {
      Category.findAll()
      .then((result) => {
        return Item.create({
          CategoryId: result[0].dataValues.id,
          name: 'Supreme shirt',
          price: 500000,
          stock: 10,
          imageUrl: 'wow.com'
        })
      })
      .then((data) => {
        expect(data.dataValues).property('id')
        expect(data.dataValues).property('CategoryId')
        expect(data.dataValues).property('name')
        expect(data.dataValues).property('price')
        expect(data.dataValues).property('stock')
        expect(data.dataValues).property('imageUrl')
        expect(data.dataValues.id).to.be.a('number')
        expect(data.dataValues.CategoryId).to.be.a('number')
        expect(data.dataValues.name).to.be.a('string')
        expect(data.dataValues.price).to.be.a('number')
        expect(data.dataValues.stock).to.be.a('number')
        expect(data.dataValues.imageUrl).to.be.a('string')
        done()
      })
      .catch((err) => {
        done(err)
      });
    })
  })
})
