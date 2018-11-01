'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('password', this.generateHash(val));
            }
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
    User.prototype.generateHash=((password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    });
    User.prototype.validPassword=((password) => {
        return bcrypt.compareSync(password, this.password);
    });
    return User;
};
