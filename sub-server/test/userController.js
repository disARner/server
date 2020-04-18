let assert = require('assert')
const chai = require('chai')
const app = require('../app')
const { expect, be } = chai
const request = require('supertest')
let { test, describe, suite } = require('mocha')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

suite('testing User', () => {
  suite('User Register on Controller', () => {
  
    let data = { username: 'admin3', email: 'admin3@mail.com', password: 'admin3', role: 'user' }
  
    afterEach((done) => {
      queryInterface.bulkDelete('Users', null, {})
      .then(_ => {
        done()
      })
      .catch(err => done(err))
    })
  
    describe('Success Register', () => {
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
      
      it('Should return username has already been used if username has already in database', () => {
  
        data.email = 'wawan@mail.com'
        request(app)
        .post('/register')
        .send(data)
        .expect(400)
        .end((err,res) => {
          // console.log(err,"<<<<< ERR ATAS")
          // console.log(err.message,"<<<<< ERR message")
          // console.log(res.body,"<<<< RB ATAS")
          expect(res.body.message[0],"username has already been used")
          if(err) return err
        })
      })
  
      it.skip('Should return 500 internal server error', async () => {
        data.email = 'wawan@mail.com'
        data.username = "mamang@mail.com"
        console.log()
        request(app)
        .post('/register')
        .send(data)
        .expect(500)
        .end((err,res) => {
          console.log(data.email)
          console.log(data.username)
          console.log(res.body,"<<<<< BWH")
          console.log(err,"<<<<< ERROR BWH")
          expect(res.body.status, 500)
          // expect(res.body.message,"email has already been used")
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
  
  suite('User Login on Controller', () => {
  
    // let data = { username: 'admin4', email: 'admin4@mail.com', password: 'admin4', role: 'user' }
  
    describe('Success Login', () => {

      // before((done) => {
      //   let data = { username: 'admin4', email: 'admin4@mail.com', password: 'admin4', role: 'user' }
      //   User.create({
      //     email: data.email, password: data.password, username: data.username, role: data.role
      //   })
      //   .then(_ => {console.log('apakah masuk sini ?');done()})
      //   .catch(err => {console.log(err,"<<<<< ERROR BEFORE");done(err)})
      // })

      it('Should return token, username while user success login', () => {
        let data = { email: 'admin4@mail.com', password: 'admin4' }
        // console.log(data,"<<<<<<< data login")
        request(app)
        .post('/login')
        .send(data)
        .expect(200)
        .end((err,res) => {
          if(err) return err
          expect(res.body).property('token')
          expect(res.body).property('username')
          expect(res.body.token).to.be.a('string')
          expect(res.body.username).to.be.a('string')
        })
      })
    })

    describe.skip('Error Login', () => {
      it('Should return email or password wrong while user wrong input email', (done) => {
        let data = { email: 'admin4@mail.com', password: 'admin5' }
        request(app)
        .post('/login')
        .send(data)
        .expect(400)
        .end((err,res) => {
          console.log(err,"<<<<<< ERROR LOGIN")
          console.log(res.body,"<<<<<<< REQ BODY ERROR LOGIN")
          if(err) done(err)
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status).to.be.a('number')
          expect(res.body.message).to.be.a('string')
          expect(res.body.status, 400)
          done()
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