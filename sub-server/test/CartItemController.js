const chai = require('chai')
const app = require('../app')
const { expect } = chai
const request = require('supertest')
let { describe } = require('mocha')
const { sequelize, Category, Item, User } = require('../models')
const { queryInterface } = sequelize

describe('testing Cart Item', () => {
  describe('testing Cart Item Controller', () => {
    let token = null
    let CategoryId = null
    let ItemId = null
    let CartId = null

    // register
    before((done) => {
      // console.log('masuk ga sih')
      // request(app)
      // .post('/register')
      // .send({
      //   username: 'admin',
      //   email: 'admin@mail.com',
      //   password: 'admin',
      //   role: 'admin'})
      // .end((err,res) => {
      //   done()
      // })
      User.create({
        username: 'admin',
        email: 'admin@mail.com',
        password: 'admin',
        role: 'admin'
      })
      .then(_ => done())
      .catch(err => done(err))
    })

    // login
    before((done) => {
      request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: 'admin' })
      .end((err,res) => {
        console.log(res.body,"<<<<<<<<<<<<<<<<<<<<<<<<<<< before EACH CART ITEEEEEEEEEEEEEMMMMMMMMMMM")
        this.token = res.body.token
        token = res.body.token
        done()
      })
    })

    // POST Category
    before((done) => {
      request(app)
      .post('/category')
      .send({ name: 'shirt' })
      .end((err,res) => {
        CategoryId = res.body.id
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
        itemId = res.body.id
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
      it('should return status 201 and message Add cart successful', () => {
        console.log(this.token,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TOKEN MASOOOOOOOOOOOOOOOKKKKKKKKKKKK")
        request(app)
        .post('/cart')
        .send({ ItemId: this.itemId, quantity: 1 })
        .set('token',token)
        .expect(201)
        .end((err,res) => {
          console.log(this.itemId,"<<<<<<<<<<<<<< ITEM ID !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          console.log(token,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TOKEN")
          console.log(this.token,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  THIS TOKEN")
          console.log(res.body,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RES BODY")
          console.log(err,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ERR")
          if(err) return err
          console.log(token,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TOKEN")
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 201)
          expect(res.body.message, "Add cart successful")
        })
        // console.log(token,"<<<<<<<<<<<<<<< TOKENNN")
      })
    })
    

    describe('testing findCartItem', () => {
      it('should return status 200 and cart list', () => {
        request(app)
        .get('/cart')
        .set('token',token)
        .expect(200)
        .end((err,res) => {
          if(err) return err
          expect(res.body).property('status')
          expect(res.body).property('UserId')
          expect(res.body).property('CartItems')
          expect(res.body.status, 200)
          expect(res.body.CartITems[0]).property('id')
          expect(res.body.CartITems[0]).property('CartId')
          expect(res.body.CartITems[0]).property('ItemId')
          expect(res.body.CartITems[0]).property('isPaid')
          expect(res.body.CartITems[0]).property('quantity')
          expect(res.body.CartITems[0]).property('item')
          expect(res.body.CartITems[0].item).property('id')
          expect(res.body.CartITems[0].item).property('CategoryId')
          expect(res.body.CartITems[0].item).property('name')
          expect(res.body.CartITems[0].item).property('price')
          expect(res.body.CartITems[0].item).property('stock')
          expect(res.body.CartITems[0].item).property('imageUrl')
          this.CartId = res.body.CartITems[0].CartId
        })
      })
    })
    
    describe('testing updateCartItem', () => {
      it('should return status 200 and message update cart successful', () => {
        request(app)
        .put(`/cart/${this.CartId}`)
        .set('token',token)
        .send({ quantity: 3 })
        .expect(200)
        .end((err,res) => {
          if(err) return err
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 200)
          expect(res.body.message, "Update cart successful")
        })
      })
    })
    
    
    describe('testing checkout', () => {
      it('should return status 200 and message checkout successful')
      request(app)
      .put('/cart/checkout')
      .set('token',token)
      .expect(200)
      .end((err,res) => {
        if(err) return err
        expect(res.body).property('status')
        expect(res.body).property('message')
        expect(res.body.status, 200)
        expect(res.body.message, "checkout successful")
      })
    })
    
    describe('testing history', () => {
      it('should return status 200 and cart list', () => {
        request(app)
        .get('/cart/history')
        .set('token',token)
        .expect(200)
        .end((err,res) => {
          if(err) return err
          expect(res.body).property('status')
          expect(res.body).property('UserId')
          expect(res.body).property('CartItems')
          expect(res.body.status, 200)
          expect(res.body.CartITems[0]).property('id')
          expect(res.body.CartITems[0]).property('CartId')
          expect(res.body.CartITems[0]).property('ItemId')
          expect(res.body.CartITems[0]).property('isPaid')
          expect(res.body.CartITems[0]).property('quantity')
          expect(res.body.CartITems[0]).property('item')
          expect(res.body.CartITems[0].item).property('id')
          expect(res.body.CartITems[0].item).property('CategoryId')
          expect(res.body.CartITems[0].item).property('name')
          expect(res.body.CartITems[0].item).property('price')
          expect(res.body.CartITems[0].item).property('stock')
          expect(res.body.CartITems[0].item).property('imageUrl')
        })
      })
    })
    
    describe('testing deleteCartItem', () => {
      it('should return status 200 and message Delete Cart Successful', () => {
        request(app)
        .delete(`/cart/${this.itemId}`)
        .set('token',token)
        .expect(200)
        .end((err,res) => {
          expect(res.body).property('status')
          expect(res.body).property('message')
          expect(res.body.status, 200)
          expect(res.body.message, "Delete cart successful")
        })
      })
    })

  })
  
})
