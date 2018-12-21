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
    User.prototype.validPassword=function(password) {
        //console.log("VALIDATIN PASSWORD",password,this.password)
        return bcrypt.compareSync(password, this.password);
    };
    User.prototype.isAdmin=function() {
        return this.login=='admin';
    };
    User.prototype.isGuest=function() {
        return this.login=='guest';
    };
    User.setup= async function() {
        var admin=await User.findOne({where: {login: 'admin'}})
        User.admin=admin
        var guest=await User.findOne({where: {login: 'guest'}})
        User.guest=guest
    }
    return User;
};
