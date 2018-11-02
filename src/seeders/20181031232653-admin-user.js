var utils=require('../lib/utils');

module.exports = {
  up: (queryInterface, Sequelize) => {
      var password = utils.stringGen(10);
      console.log("Admin password:", password);
      return queryInterface.bulkInsert('users', [{
        login: 'admin',
        password: password,
        created_at: new Date,
        updated_at: new Date,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
