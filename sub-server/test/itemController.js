const chai = require('chai')
const app = require('../app')
const { expect } = chai
const request = require('supertest')
let { describe } = require('mocha')
const { sequelize, Category, Item } = require('../models')
const { queryInterface } = sequelize

describe('testing Item', () => {
  describe('testing Item Controller', () => {
    describe('testing Create Item on Controller ', () => {
      let CategoryId = null
      afterEach((done) => {
        queryInterface.bulkDelete('Items', null, {})
        .then(_ => done())
        .catch(err => done(err))
      })

      beforeEach((done) => {
        Category.create({
          name: 'shirt'
        })
        .then(result => {
          CategoryId = result.dataValues.id
          done()
        })
        .catch(err => done(err))
      })

      
      describe('testing Success Create', () => {
        it('should return data item while user success input', () => {
          let data = { name: 'tshirt 3D', price: 50000, stock: 10, imageUrl: 'asalajah.com', CategoryId }
          request(app)
          .post('/item')
          .send(data)
          .expect(201)
          .end((err,res) => {
            if(err) return err
            console.log(res.body,"<<<<<<<<<< HELLO WORLD")
            expect(res.body).property('name')
            expect(res.body).property('price')
            expect(res.body).property('stock')
            expect(res.body).property('imageUrl')
            expect(res.body).property('CategoryId')
          })
        })
      })
      
      describe('testing Error Create', () => {
        it('should return price cant a negative number while user input negative price', () => {
          let data = { name: 'tshirt 3D', price: -50000, stock: 10, imageUrl: 'asalajah.com', CategoryId }
          request(app)
          .post('/item')
          .send(data)
          .expect(400)
          .end((err,res) => {
            expect(res.body).property('message')
            expect(res.body).property('status')
            expect(res.body.message[0], 'price cant a negative number')
            expect(res.body.status, 400)
            if(err) return err
          })
        })
      })
    })

    describe('testing update Item on Controller', () => {
      let CategoryId = null
      beforeEach((done) => {
        Category.create({
          name: 'shirt'
        })
        .then(result => {
          CategoryId = result.dataValues.id
          done()
        })
        .catch(err => done(err))
      })

      describe('testing Success update', () => {
        let data = { name: 'tshirt 3D', price: 50000, stock: 10, imageUrl: 'asalajah.com', CategoryId }
        let id = null
        beforeEach((done) => {
          Item.create({
            name: data.name, price: data.price, stock: data.stock, imageUrl: data.imageUrl, CategoryId
          })
          .then(result => {
            id = result.dataValues.id
            done()
          })
          .catch(err => done(err))
        })

        it('should return message success update while user success update data', () => {
          request(app)
          .put(`/item/${id}`)
          .send(data)
          .expect(200)
          .end((err,res) => {
            console.log(res.body,"<<<<<<<<<<< SUCCESS UPDATE")
            if(err) return err
            expect(res.body).property('message')
            expect(res.body.message, "Success Update")
          })
        })
      })
      
      describe('testing Error update', () => {
        let data = { name: 'tshirt 3D', price: 50000, stock: 10, imageUrl: 'asalajah.com', CategoryId }
        let id = null
        beforeEach((done) => {
          Item.create({
            name: data.name, price: data.price, stock: data.stock, imageUrl: data.imageUrl, CategoryId
          })
          .then(result => {
            id = result.dataValues.id
            done()
          })
          .catch(err => done(err))
        })

        it('Should return message internal server error while user wrong input id', () => {
          let data = { name: 'tshirt 3D', price: 'abcdef', stock: 10, imageUrl: 'asalajah.com', CategoryId }
          request(app)
          .put(`/item/9999`)
          .send(data)
          .expect(500)
          .end((err,res) => {
            console.log(res.body,"<<<<<<<<<<< ERROR UPDATE")
            expect(res.body).property('message')
            expect(res.body).property('status')
            expect(res.body.message, 'Internal Server Error')
            expect(res.body.status, 500)
            if(err) return err
          })
        })
      })
      
    })
    
    describe('testing find Item on Controller', () => {
      let CategoryId = null
      beforeEach((done) => {
        Category.create({
          name: 'shirt'
        })
        .then(result => {
          CategoryId = result.dataValues.id
          done()
        })
        .catch(err => done(err))
      })

      it('should return all data item', () => {
        let data = { name: 'tshirt 3D', price: 50000, stock: 10, imageUrl: 'asalajah.com', CategoryId }
        beforeEach((done) => {
          Item.create({
            name: data.name, price: data.price, stock: data.stock, imageUrl: data.imageUrl, CategoryId
          })
          .then(_ => done())
          .catch(err => done(err))
        })
        request(app)
        .get('/item')
        .expect(200)
        .end((err,res) => {
          if (err) return err
          expect(res.body).to.be.a('Array')
        })
      })
    })
    
    describe('testing delete Item on Controller', () => {
      describe('testing Success delete', () => {
        let CategoryId = null
        beforeEach((done) => {
          Category.create({
            name: 'shirt'
          })
          .then(result => {
            CategoryId = result.dataValues.id
            done()
          })
          .catch(err => done(err))
        })

        let data = { name: 'tshirt 3D', price: 50000, stock: 10, imageUrl: 'asalajah.com', CategoryId }
        let id = null
        beforeEach((done) => {
          Item.create({
            name: data.name, price: data.price, stock: data.stock, imageUrl: data.imageUrl, CategoryId
          })
          .then(result => {
            console.log(result.dataValues,"<<<<<<<<<<<<<<<<< RES CREATE DELETE")
            id = result.dataValues.id
            done()
          })
          .catch(err => done(err))
        })

        it('Should return message succes delete while user success delete item', () => {
          request(app)
          .delete(`/item/${id}`)
          .expect(200)
          .end((err,res) => {
            if(err) return err
            expect(res.body).property('message')
            expect(res.body).property('status')
            expect(res.body.message, "Success Delete")
            expect(res.body.status, 200)
          })
        })
      })

      describe('testing Error delete', () => {
        let CategoryId = null
        beforeEach((done) => {
          Category.create({
            name: 'shirt'
          })
          .then(result => {
            CategoryId = result.dataValues.id
            done()
          })
          .catch(err => done(err))
        })

        let data = { name: 'tshirt 3D', price: 50000, stock: 10, imageUrl: 'asalajah.com', CategoryId }
        let id = null
        beforeEach((done) => {
          Item.create({
            name: data.name, price: data.price, stock: data.stock, imageUrl: data.imageUrl, CategoryId
          })
          .then(result => {
            console.log(result.dataValues,"<<<<<<<<<<<<<<<<< RES CREATE DELETE")
            id = result.dataValues.id
            done()
          })
          .catch(err => done(err))
        })

        it('Should return message data not found while user wrong input id', () => {
          request(app)
          .delete('/item/aa')
          .expect(404)
          .end((err,res) => {
            console.log(res.body,"<<<<<<<<<<<<<<<<<< ERROR DELETE")
            expect(res.body).property('message')
            expect(res.body).property('status')
            expect(res.body.message, "Data Not Found")
            expect(res.body.status, 404)
            if(err) return err
          })
        })
      })
      
    })
  })
})