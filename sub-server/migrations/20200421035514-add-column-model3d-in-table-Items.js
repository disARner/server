'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Items', 'model3d', Sequelize.STRING, { after: "imageUrl" })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Items', 'model3d', {})
  }
};
