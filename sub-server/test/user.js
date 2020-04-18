let assert = require('assert')
let { test, describe } = require('mocha')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

describe('User DB TEST', () => {
  
  let account = { username: 'admin', email:'admin@mail.com', password:'admin', role:'admin' }

  afterEach((done) => {
    queryInterface.bulkDelete('Users',null,{})
    .then(_ => done())
    .catch(err => done(err))
  })
  
  // after((done) => {
  //   queryInterface.bulkDelete('Users',null,{})
  //   .then(_ => done())
  //   .catch(err => done(err))
  // })

  describe('Success add User to DB', () => { // lempar Success message
    test('should return data if user success create', async () => {
      try {
        let result = await User.create({
          username: account.username,
          email: account.email,
          password: account.password,
          role: account.role
        })
        assert.equal(result.dataValues.username, "admin")
        assert.equal(result.dataValues.email, "admin@mail.com")
        assert.equal(result.dataValues.role, "admin")
      }
      catch(err) {
        console.log(err)
      }
    })
  })
  
  describe('Error Register', () => {
    test('should return a username is required if user doesnt input username', async () => {
      try{
        let result = await User.create({
          email: account.email,
          password: account.password,
          role: account.role
        })
      }
      catch(err) {
        assert.equal(err.errors[0].message,"username is required")
      }
    })

    test('should return a password is required if user doesnt input password', async () => {
      try{
        let result = await User.create({
          username: account.username,
          email: account.email,
          role: account.role
        })
      }
      catch(err) {
        assert.equal(err.errors[0].message,"password is required")
      }
    })

    test('should return a role is required if role is empty', async () => {
      try{
        let result = await User.create({
          username: account.username,
          password: account.password,
          email: account.email,
        })
      }
      catch(err) {
        assert.equal(err.errors[0].message,"role is required")
      }
    })

    test('should return a email has already been used if email has already in database', async () => {

      try{
        let result = await User.create({
          username: account.username,
          password: account.password,
          email: account.email,
          role: account.role
        })
      }
      catch(err) {
        assert.equal(err.errors[0].message,"email has already been used")
      }
    })

    test('should return a username has already been used if username has already in database', async () => {

      beforeEach((done) => {
        User.create({
          username: account.username,
          password: account.password,
          email: account.email,
          role: account.role
        })
        .then(_ => done())
        .catch(err => done(err))
      })

      try{
        let result = await User.create({
          username: account.username,
          password: account.password,
          email: 'aman@mail.com',
          role: account.role
        })
      }
      catch(err) {
        assert.equal(err.errors[0].message,"username has already been used")
      }
    })

  })
})

// describe.skip('User Login', () => {
//   describe('Success Login', () => { // lempar { username token }

//     beforeEach((done) => {
//       User.create({
//         username: 'admin',
//         email: 'admin@mail.com',
//         password: 'admin',
//         role: 'admin'
//       })
//       .then(_ => done())
//       .catch(err => done(err))
//     })

//     afterEach((done) => {
//       queryInterface.bulkDelete('Users',{})
//     })

//     test('should return a token', () => {
      
//     })
//   })
// })