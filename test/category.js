const { describe } = require('mocha')
const chai = require('chai')
const { expect } = chai
const { sequelize, Category } = require('../models')
const { queryInterface } = sequelize

describe('Category DB TEST', () => {

  after((done) => {
    queryInterface.bulkDelete('Categories', null, {})
    .then(_ => done())
    .catch(err => done(err))
  })

  describe('Success ', () => {
    it('Should return data when user success input', (done) => {
      Category.create({
        name: 'shirt'
      })
      .then((result) => {
        expect(result.dataValues).property('id')
        expect(result.dataValues).property('name')
        expect(result.dataValues.id).to.be.a('number')
        expect(result.dataValues.name).to.be.a('string')
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
})
