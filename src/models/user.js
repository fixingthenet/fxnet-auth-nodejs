'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      login: {
          type: DataTypes.STRING,
          unique: true
      }
  }, {
      timestamp: false,
      paranoid: false,
      underscored: true,
      tableName: 'users',
     });
//  User.associate = function(models) {
//    // associations can be defined here
//  };
  return User;
};
