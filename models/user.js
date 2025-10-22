'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helper/bcryptHelper');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
      User.belongsToMany(models.Product, { through: 'UserProduct' });
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email already been used"
      },
      validate: {
        notNull: true,
        notEmpty: {
          msg: "email must be filled"
        },
        isEmail: {
          msg: "input with format email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password must be filled"
        },
        notEmpty: {
          msg: "password must be filled"
        },
        len: {
          args: [8, 64],
          msg: "password minimum 8 character"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "choose your role"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => {
    user.password = hashPass(user.password)
  })
  return User;
};