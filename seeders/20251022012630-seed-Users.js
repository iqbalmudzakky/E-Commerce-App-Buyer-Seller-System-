'use strict';

const { hashPass } = require("../helper/bcryptHelper");

const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile("./data/users.json", "utf-8")).map(el => {

      el = {
        email: el.email,
        password: hashPass(el.password),
        role: el.role,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      return el
    })

    await queryInterface.bulkInsert("Users", data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
