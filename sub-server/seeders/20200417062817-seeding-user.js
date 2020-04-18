'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [ 
      { username: 'admin2', password: 'admin2', email: 'admin2@mail.com', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { username: 'admin3', password: 'admin3', email: 'admin3@mail.com', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user', password: 'user', email: 'user@mail.com', role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user2', password: 'user2', email: 'user2@mail.com', role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user3', password: 'user3', email: 'user3@mail.com', role: 'user', createdAt: new Date(), updatedAt: new Date() },
    ]

    return queryInterface.bulkInsert('Users', data, {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {})
  }
};
