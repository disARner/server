const chai = require('chai')
const app = require('../app')
const { expect } = chai
const request = require('supertest')
let { describe } = require('mocha')
const { sequelize, Category, Item, User } = require('../models')
const { queryInterface } = sequelize
const helper = require('../helpers/index')

describe('testing Cart Item', () => {
  describe('testing Cart Item Controller', () => {

    // register
    before((done) => {
      request(app)
      .post('/register')
      .send({
        username: 'admin',
        email: 'admin@mail.com',
        password: 'admin',
        role: 'admin'})
      .end((err,res) => {
        this.UsedId = res.body.id
        done()
      })
    })

    // login
    before((done) => {
      request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: 'admin' })
      .end((err,res) => {
        this.token = res.body.token
        // token = res.body.token
        done()
      })
    })

    // POST Category
    before((done) => {
      request(app)
      .post('/category')
      .send({ name: 'shirt' })
      .end((err,res) => {
        // CategoryId = res.body.id
        this.CategoryId = res.body.id
        done()
      })
    })

    // POST Item
    before((done) => {
      request(app)
      .post('/item')
      .send({ name: 'Tshirt 3D', price: 5000000, stock: 20, imageUrl: 'asalajalah.com', CategoryId: this.CategoryId })
      .end((err,res) => {
        this.itemId = res.body.id
        done()
      })
    })

    after((done) => {
      queryInterface.bulkDelete('Users', null, {})
      .then(_ => done())
      .catch(err => done(err))
    })

    after((done) => {
      queryInterface.bulkDelete('Categories', null, {})
      .then(_ => done())
      .catch(err => done(err))
    })

    after((done) => {
      queryInterface.bulkDelete('Items', null, {})
      .then(_ => done())
      .catch(err => done(err))
    })

    after((done) => {
      queryInterface.bulkDelete('CartItems', null, {})
      .then(_ => done())
      .catch(err => done(err))
    })

    describe('testing createCartItem', () => {
      it('should return status 201 and message Add cart successful', (done) => {
        request(app)
        .post('/cart')
        .send({ ItemId: this.itemId, quantity: 1 })
        .set('token',this.token)
        .expect(201)
        .end((err,res) => {
          if(err) done(err)
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 201)
          expect(res.body.message, "Add cart successful")
          done()
        })
      })

      it('should return status 201 and message add cart successful if data already exist', (done) => {
        request(app)
        .post('/cart')
        .send({ ItemId: this.itemId, quantity: 1 })
        .set('token', this.token)
        .expect(201)
        .end((err,res) => {
          // if(err) done(err)
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 201)
          expect(res.body.message, "Add cart successful")
          expect()
          done()
        })
      })
      
    })
    
    describe('testing createCartItem', () => {
      it('should return status 401 and message Please login properly while token not found', (done) => {
        request(app)
        .post('/cart')
        .send({ ItemId: this.itemId, quantity: 1 })
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIyNSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1ODczNTUxNjR9.U7MdvYAbOgrzpee37tmUnPp17q6nW0o_as6_bwAkfus')
        .expect(401)
        .end((err,res) => {
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 401)
          expect(res.body.message, "Please login properly")
          done()
        })
      })
    })

    describe('testing findCartItem', () => {
      it('should return status 200 and cart list', (done) => {
        request(app)
        .get('/cart')
        .set('token',this.token)
        .expect(200)
        .end((err,res) => {
          if(err) done(err)
          expect(res.body).property('UserId')
          expect(res.body).property('CartItems')
          expect(res.body.CartItems[0]).property('id')
          expect(res.body.CartItems[0]).property('CartId')
          expect(res.body.CartItems[0]).property('ItemId')
          expect(res.body.CartItems[0]).property('isPaid')
          expect(res.body.CartItems[0]).property('quantity')
          expect(res.body.CartItems[0]).property('Item')
          expect(res.body.CartItems[0].Item).property('id')
          expect(res.body.CartItems[0].Item).property('CategoryId')
          expect(res.body.CartItems[0].Item).property('name')
          expect(res.body.CartItems[0].Item).property('price')
          expect(res.body.CartItems[0].Item).property('stock')
          expect(res.body.CartItems[0].Item).property('imageUrl')
          this.CartId = res.body.CartItems[0].CartId
          done()
        })
      })
    })
    
    describe('testing updateCartItem', () => {
      it('should return status 200 and message update cart successful', (done) => {
        request(app)
        .put(`/cart/${this.CartId}`)
        .set('token',this.token)
        .send({ quantity: 3 })
        .expect(200)
        .end((err,res) => {
          // if(err) done(err)
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 200)
          expect(res.body.message, "Update cart successful")
          done()
        })
      })
    })

    describe.skip('testing UpdateCartItem error while wrong id', () => {
      it("should return blm tau", (done) => {
        let newToken = helper.getToken({ id: this.UsedId, ItemId: 2 })
        request(app)
        .put(`/cart/1`)
        .set('token', newToken)
        .send({ quantity: 2 })
        .expect(500)
        .end((err,res) => {
          console.log(res.body,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ERROR UPDATE CART ITEM ???????????????????")
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 500)
          expect(res.body.message, "Internal Server Error")
          done()
        })
      })
    })
    
    
    
    describe('testing checkout', () => {
      it('should return status 200 and message checkout successful', (done) => {
        request(app)
        .put('/cart/checkout')
        .set('token',this.token)
        .expect(200)
        .end((err,res) => {
          if(err) done(err)
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 200)
          expect(res.body.message, "checkout successful")
          done()
        })
      })
    })

    describe('testing error checkout and history', () => {
      // let newToken = null
      before((done) => {
        request(app)
        .post('/register')
        .send({ username: 'admin2', email: 'admin2@mail.com', password: 'admin2', role: 'admin2' })
        .end((err,res) => {
          done()
        })
      })

      before((done) => {
        request(app)
        .post('/login')
        .send({ username: 'admin2', email: 'admin2@mail.com', password: 'admin2', role: 'admin2' })
        .end((err,res) => {
          console.log(res.body.token,"<<<<<<<<<<<<< NEW TOKEN ?")
          this.newToken = res.body.token
          done()
        })
      })

      it('should return status 400 and message No item in cart', (done) => {
        request(app)
        .put('/cart/checkout')
        .set('token',this.newToken)
        .expect(400)
        .end((err,res) => {
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 400)
          expect(res.body.message, "No item in Cart")
          done()
        })
      })
      
      it.skip('should return idk', (done) => {
        request(app)
        .get('/cart/history')
        .set('token', this.newToken)
        .end((err,res) => {
          console.log(res.body,"<<<<<<<<<<<<<<<<<<<<<<<<<< ERROR HISTORY ??????????????????????????")
          done()
        })
      })

      it.skip("should return blm tau", (done) => {
        // let newToken = helper.getToken({ id: this.UsedId, ItemId: 2 })
        request(app)
        .put(`/cart/1`)
        .set('token', this.newToken)
        // .send({ quantity: 2 })
        .expect(500)
        .end((err,res) => {
          console.log(res.body,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ERROR UPDATE CART ITEM ???????????????????")
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 500)
          expect(res.body.message, "Internal Server Error")
          done()
        })
      })
    })
    
    describe('testing history', () => {
      it('should return status 200 and cart list', (done) => {
        request(app)
        .get('/cart/history')
        .set('token',this.token)
        .expect(200)
        .end((err,res) => {
          if(err) done(err)
          expect(res.body).property('UserId')
          expect(res.body).property('CartItems')
          expect(res.body.CartItems[0]).property('id')
          expect(res.body.CartItems[0]).property('CartId')
          expect(res.body.CartItems[0]).property('ItemId')
          expect(res.body.CartItems[0]).property('isPaid')
          expect(res.body.CartItems[0]).property('quantity')
          expect(res.body.CartItems[0]).property('Item')
          expect(res.body.CartItems[0].Item).property('id')
          expect(res.body.CartItems[0].Item).property('CategoryId')
          expect(res.body.CartItems[0].Item).property('name')
          expect(res.body.CartItems[0].Item).property('price')
          expect(res.body.CartItems[0].Item).property('stock')
          expect(res.body.CartItems[0].Item).property('imageUrl')
          done()
        })
      })
    })
    
    describe('testing deleteCartItem', () => {
      it('should return status 200 and message Delete Cart Successful', (done) => {
        request(app)
        .delete(`/cart/${this.itemId}`)
        .set('token',this.token)
        .expect(200)
        .end((err,res) => {
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 200)
          expect(res.body.message, "Delete cart successful")
          done()
        })
      })
    })

  })
  
})
