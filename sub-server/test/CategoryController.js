const chai = require('chai')
const app = require('../app')
const { expect, be } = chai
const request = require('supertest')
let { describe, suite } = require('mocha')
const { sequelize, Category } = require('../models')
const { queryInterface } = sequelize

describe('testing Category', () => {
  describe('testing Category on Controller', () => {
    describe('testing Create Category on Controller', () => {

      afterEach((done) => {
        queryInterface.bulkDelete('Categories', null, {})
        .then(_ => done())
        .catch(err => done(err))
      })

      describe('testing Success Create', () => {
        let data = { name: 'shirt' }
        it('should return data while user success input', async () => {
          request(app)
          .post('/category')
          .send(data)
          .expect(201)
          .end((err,res) => {
            if(err) return err
            expect(res.body).property('id')
            expect(res.body).property('name')
          })
        })
      })

      describe('testing Error Create', () => {
        it('should return name is required while user doesnt input name', async () => {
          request(app)
          .post('/category')
          .send({})
          .expect(400)
          .end((err,res) => {
            if(err) return err
            expect(res.body).property('status')
            expect(res.body).property('message')
            expect(res.body.message,"name is required")
          })
        })
      })
    })

    describe('testing Find Category on Controller', () => {

      beforeEach((done) => {
        Category.create({ name: 'shirt' })
        .then(_ => done()
        )
        .catch(err => done(err));
      })

      it('should return all data category', async () => {
        request(app)
        .get('/category')
        .expect(200)
        .end((err,res) => {
          if(err) return err
          expect(res.body).to.be.a('Array')
        })
      })
    })
    
    describe('testing Find by id Category on Controller', () => {
      describe('testing success find by id', () => {
        it('should return one data category', async () => {
          let id = null
          beforeEach((done) => {
            Category.create({ name: 'shirt' })
            .then(_ => done())
            .catch(err => done(err))
          })
  
          beforeEach((done) => {
            
            Category.findAll()
            .then(result => {
              id = result[0].dataValues.id
              done()
            })
            .catch(err => done(err))
          })
  
          request(app)
          .get(`/category/${id}`)
          .expect(200)
          .end((err,res) => {
            console.log(id)
            if(err) return err
            expect(res.body).property('id')
            expect(res.body).property('name')
          })
        })
      })

      describe('testing error find by id', () => {
        it('should return idk', (done) => {

          before((done) => {
            Category.create({ name: 'shirt' })
            .then(_ => done())
            .catch(err => done(err))
          })
          
          request(app)
          .get('/category/1000')
          .expect(500)
          .end((err,res) => {
            expect(res.body.status, 500)
            expect(res.body.message, "Internal Server Error")
            done()
          })
        })
      })
    })
  })
})
