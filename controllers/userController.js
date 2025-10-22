const { User, Profile } = require("../models")

class UserController {
  static async showRegister(req, res) {
    try {
      const { errors } = req.query

      res.render("users/register", { errors })
    } catch (err) {
      res.send(err)
    }
  }

  static async register(req, res) {
    try {
      const { fullName, address, phone, email, password, role } = req.body

      let newUser = await User.create({ email, password, role })
      // console.log(newUser);

      await Profile.create({ fullName, address, phone, UserId: newUser.id })

      res.redirect("/login")
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        err = err.errors.map(el => el.message)
        res.redirect(`/register?errors=${err}`)
      } else if (err.name === "SequelizeUniqueConstraintError") {
        err = err.errors.map(el => el.message)
        res.redirect(`/register?errors=${err}`)
      } else {
        res.send(err)
      }
    }
  }

  static async showLogin(req, res) {
    try {
      res.render("users/login")
    } catch (err) {
      res.send(err)
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = UserController