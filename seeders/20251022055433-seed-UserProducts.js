'use strict';
const fs = require("fs").promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile("./data/userProducts.json", "utf-8")).map(el => {
      el = {
        UserId: el.userId,
        ProductId: el.productId,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      return el
    })

    await queryInterface.bulkInsert("UserProducts", data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProducts', null, {});
  }
};
