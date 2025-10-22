'use strict';
const fs = require("fs").promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile("./data/profiles.json", "utf-8")).map(el => {
      el = {
        fullName: el.fullName,
        address: el.address,
        phone: el.phone,
        UserId: el.userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      return el
    })

    await queryInterface.bulkInsert("Profiles", data)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
