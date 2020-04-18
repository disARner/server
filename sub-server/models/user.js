'use strict';

const {encrypt} = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'username is required'
        },
        isUnique: (value,next) => {
          User.findOne({
            where:{
              username: value
            }
          })
          .then((result) => {
            if(result) {
              next({status: 400, message: 'username has already been used'})
            } else {
              next()
            }
          }).catch((err) => {
            next(err)
          });
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'email is required'
        },
        isUnique: (value,next) => {
          console.log(value)
          User.findOne({
            where:{
              email: value
            }
          })
          .then((result) => {
            if(result) {
              next({status: 400, message: 'email has already been used'})
            } else {
              next()
            }
          }).catch((err) => {
            next(err)
          });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'password is required'
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg:'role is required'
        },
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user, options) {
        encrypt(user)
      }
    }
  });
  User.associate = function(models) {
    User.hasOne(models.Cart)
  };
  return User;
};