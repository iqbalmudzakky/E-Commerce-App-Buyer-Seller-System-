'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    get idr() {
      return this.price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR"
      })
    }

    lastUpdate(date) {
      let now = new Date()
      let diffMs = now.getTime() - new Date(date)
      let diffSec = Math.floor(diffMs / 1000)
      let diffMin = Math.floor(diffSec / 60)
      let diffHour = Math.floor(diffMin / 60)
      let diffDay = Math.floor(diffHour / 24)

      if (diffSec < 60) {
        return `${diffSec} sec ago`
      } else if (diffMin < 60) {
        return `${diffMin} min ago`
      } else if (diffHour < 24) {
        return `${diffHour} hour ago`
      } else {
        return `${diffDay} day ago`
      }
    }

    static async getProductBySearch(userId, role, search, User, Profile, Category) {
      let data
      console.log(role);

      if (role === "buyer") {
        data = await Product.findAll({
          include: [{
            model: User,
            include: Profile
          }, Category],
          where: {
            name: {
              [Op.iLike]: `%${search}%`
            }
          }
        })

      } else if (role === "seller") {
        data = await Product.findAll({
          include: [{
            model: User,
            where: {
              id: userId
            },
            include: Profile
          }, Category],
          where: {
            name: {
              [Op.iLike]: `%${search}%`
            }
          }
        })
      }
      console.log(data);

      return data
    }

    static associate(models) {
      // define association here
      Product.belongsTo(models.User)
      Product.belongsToMany(models.User, { through: 'UserProduct' });
      Product.belongsTo(models.Category)
    }
  }

  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};