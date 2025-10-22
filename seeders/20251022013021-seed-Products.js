'use strict';
const fs = require("fs").promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile("./data/products.json", "utf-8")).map(el => {
      el = {
        name: el.name,
        description: el.description,
        price: el.price,
        UserId: el.userId,
        CategoryId: el.categoryId
      }

      el.createdAt = el.updatedAt = new Date()

      return el
    })
    await queryInterface.bulkInsert("Products", data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
