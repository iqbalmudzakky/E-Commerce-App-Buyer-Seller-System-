const { checkPass } = require("../helper/bcryptHelper")
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
      const { errors } = req.query

      res.render("users/login", { errors })
    } catch (err) {
      res.send(err)
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      let user = await User.findOne({
        include: Profile,
        where: {
          email: email
        }
      })
      // console.log(user.Profile);

      if (user) {
        if (checkPass(password, user.password)) {
          req.session.userId = user.id
          req.session.role = user.role
          req.session.name = user.Profile.fullName

          res.redirect("/products")

        } else {
          let err = "invalid password"
          res.redirect(`/login?errors=${err}`)
        }

      } else {
        let err = "email not found"
        res.redirect(`/login?errors=${err}`)
      }

    } catch (err) {
      console.log(err);
      res.send(err)
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy(err => {
        if (err) {
          res.send(err)
        } else {
          res.redirect("/login")
        }
      })

    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = UserController