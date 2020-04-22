'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Items', 'imageUrl', Sequelize.STRING, { after:'stock' })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Items', 'imageUrl', {})
  }
};
