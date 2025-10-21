const express = require("express")
const AuthController = require("../controllers/authController")

const router = express.Router()

router.get("/register", AuthController.showRegister)
router.post("/register", AuthController.register)

// 	GET/POST	Register form
// /login	GET/POST	Login form
// /logout	GET	Logout dan redirect ke login

module.exports = router