let assert = require('assert')
const chai = require('chai')
const app = require('../app')
const { expect, be } = chai
const request = require('supertest')
let { test, describe } = require('mocha')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

describe('testing User', () => {
  describe('User Register on Controller', () => {
  
    let data = { username: 'admin3', email: 'admin3@mail.com', password: 'admin3', role: 'user' }
  
    afterEach((done) => {
      queryInterface.bulkDelete('Users', null, {})
      .then(_ => {
        done()
      })
      .catch(err => done(err))
    })
  
    describe('Success Register', () => {
      let data = { username: 'admin3', email: 'admin3@mail.com', password: 'admin3', role: 'user' }
      it('Should return a success message while user success register', async () => {
        request(app)
        .post('/register')
        .send(data)
        .expect(201)
        .end((err,res) => {
          if(err) return err
          expect(res.body).property('message')
          expect(res.body).property('status')
          expect(res.body.message,"success register")
          expect(res.body.status,201)
        })
      })
    })
  
    describe('Error Register', () => {
      let data = { username: 'admin3', email: 'admin3@mail.com', password: 'admin3', role: 'user' }
      before((done) => {
        User.create({ email: data.email, username: data.username, password: data.password, role: data.role })
        .then(_ => done())
        .catch(err => done(err))
      })

      it('Should return username has already been used if username has already in database', () => {
  
        data.email = 'wawan@mail.com'
        request(app)
        .post('/register')
        .send(data)
        .expect(400)
        .end((err,res) => {
          expect(res.body.message[0],"username has already been used")
          if(err) return err
        })
      })
  
      it('Should return 500 internal server error', async () => {

        data.email = 'wawan@mail.com'
        data.username = "mamang@mail.com"
        request(app)
        .post('/register')
        .send(data)
        .expect(500)
        .end((err,res) => {
          expect(res.body.status, 500)
          if(err) return err
        })
      })

      it('Should return message username is required, email is required, password is required', async () => {
        request(app)
        .post('/register')
        .send({})
        .expect(400)
        .end((err,res) => {
          expect(res.body.status, 400)
          expect(res.body.message).to.be.a('Array')
          if(err) return err
        })
      })
  
      afterEach((done) => {
        queryInterface.bulkDelete('Users', null, {})
        .then(_ => done())
        .catch(err => done(err))
      })
    })
    
  })
  
  describe('User Login on Controller', () => {
  
    // let data = { username: 'admin4', email: 'admin4@mail.com', password: 'admin4', role: 'user' }
  
    describe('Success Login', () => {

      beforeEach((done) => {
        let data = { username: 'admin4', email: 'admin4@mail.com', password: 'admin4', role: 'user' }
        User.create({
          email: data.email, password: data.password, username: data.username, role: data.role
        })
        .then(_ => done())
        .catch(err => done(err))
      })

      it('Should return token, username while user success login', () => {
        let data = { email: 'admin4@mail.com', password: 'admin4' }
        request(app)
        .post('/login')
        .send(data)
        .expect(200)
        .end((err,res) => {
          expect(res.body).property('token')
          expect(res.body).property('username')
          expect(res.body.token).to.be.a('string')
          expect(res.body.username).to.be.a('string')
          if(err) return err
        })
      })
    })

    describe('Error Login', () => {
      beforeEach((done) => {
        let data = { username: 'admin4', email: 'admin4@mail.com', password: 'admin4', role: 'user' }
        User.create({
          email: data.email, password: data.password, username: data.username, role: data.role
        })
        .then(_ => done())
        .catch(err => done(err))
      })

      it('Should return email or password wrong while user wrong input password', () => {
        let data = { email: 'admin4@mail.com', password: 'admin5' }
        request(app)
        .post('/login')
        .send(data)
        .expect(400)
        .end((err,res) => {
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status).to.be.a('number')
          expect(res.body.message).to.be.a('string')
          expect(res.body.message, "Email or Password wrong")
          expect(res.body.status, 400)
          if(err) return err
        })
      })

      it('should return email or password wrong while user wrong input email', () => {
        let data = { email: 'admin5@mail.com', password: 'admin5' }
        request(app)
        .post('/login')
        .send(data)
        .expect(400)
        .end((err,res) => {
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status).to.be.a('number')
          expect(res.body.message).to.be.a('string')
          expect(res.body.message, "Email or Password wrong")
          expect(res.body.status, 400)
          if(err) return err
        })
      })
    })
  })
  after((done) => {
    queryInterface.bulkDelete('Users', null, {})
    .then(_ => {
      done()
    })
    .catch(err => done(err))
  })
})