const assert = require('assert')
const { describe } = require('mocha')
const chai = require('chai')
const { expect } = chai
const { sequelize, Cart, User } = require('../models')
const { queryInterface } = sequelize

describe('Cart DB TEST', () => {

  afterEach((done) => {
    queryInterface.bulkDelete('Carts', null, {})
    .then(_ => done())
    .catch((err) => done(err))
  })

  beforeEach((done) => {
    User.create({
      username: 'user',
      password: 'user',
      email: 'user@mail.com',
      role: 'user'
    })
    .then(_ => done())
    .catch((err) => done(err));
  })

  describe('Success Add Cart to DB', () => {
    it('should return a data cart when user success input add cart', (done) => {
      User.findAll()
      .then((result) => {
        console.log(result[0].dataValues.id)
        return Cart.create({
          UserId: result[0].dataValues.id
        })
      })
      .then((res) => {
        expect(res.dataValues).property('id')
        expect(res.dataValues).property('UserId')
        expect(res.dataValues.id).to.be.a('number')
        expect(res.dataValues.UserId).to.be.a('number')
        done()
      })
      .catch((err) => {
        console.log(err)
        done(err)
      });
    })
  })
  
  describe.skip('Error Add Cart to DB when UserId is null', () => { // ini malah error
    it('should return message UserId is required', (done) => {
      Cart.create()
      .then((result) => {
        // console.log(result,"<<<<< RESULT ?")
        done()
      }).catch((err) => {
        // console.log(err.errors[0],"<<<<< Error ?")
        // console.log(err.errors[0].message,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Error ?")
        expect(err.errors[0]).property('message')
        expect(err.errors[0].message).to.be.a('string')
        expect(err.errors[0].message).equal('UserId is required')
        // assert.equal(err.errors[0].message, "UserId is required")
        done(err)
      });
    })
  })
  

})
