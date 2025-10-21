const express = require("express")
const HomeController = require("../controllers/homeController")

const router = express.Router()

router("/", HomeController.home)

module.exports = router