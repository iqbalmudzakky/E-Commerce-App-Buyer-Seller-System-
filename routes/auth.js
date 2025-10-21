const express = require("express")
const router = express.Router()

const AuthController = require("../controllers/authController")

router.get("/register", AuthController.showRegister)
router.post("/register", AuthController.register)

router.get("/login", AuthController.showLogin)
router.post("/login", AuthController.login)

router.get("/logout", AuthController.logout)

/*
Auth Routes
/register	GET/POST	Register form
/login	GET/POST	Login form
/logout	GET	Logout dan redirect ke login
*/

module.exports = router