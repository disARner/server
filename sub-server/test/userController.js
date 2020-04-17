let assert = require('assert')
require('should')
const chai = require('chai')
const app = require('../app')
const expect = chai.expect
const request = require('supertest')
let { test, describe } = require('mocha')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

describe('User Register on Controller', () => {

  let data = { username: 'admin3', email: 'admin3@mail.com', password: 'admin3', role: 'admin' }

  after((done) => {
    queryInterface.bulkDelete('Users', null, {})
    .then(_ => {
      done()
    })
    .catch(err => done(err))
  })

  describe('Success Register', () => {
    it('Should return a success message while user success register', (done) => {
      request(app)
      .post('/register')
      .send(data)
      .expect(201)
      .end((err,res) => {
        console.log(res.body, "<<<<<<<<<<<< RES BODY")
        if(err) return done(err)
        expect(res.body.message,"success register")
        // res.body.user.should.have.property('message')
        done()
      })
    })
  })
})