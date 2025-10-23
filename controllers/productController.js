const { Product, User, Category, Profile } = require("../models")

class ProductController {
  static async showProduct(req, res) {
    try {
      const { errors, search } = req.query

      let name = req.session.name
      let role = req.session.role
      let userId = req.session.userId

      let data

      if (role === "buyer") {
        if (search) {
          data = await Product.getProductBySearch(userId, role, search, User, Profile, Category)
        } else {
          data = await Product.findAll({
            include: [{
              model: User,
              include: Profile
            }, Category]
          })
        }

      } else if (role === "seller") {
        if (search) {
          data = await Product.getProductBySearch(userId, role, search, User, Profile, Category)
        } else {
          data = await Product.findAll({
            include: [{
              model: User,
              where: {
                id: userId
              },
              include: Profile
            }, Category]
          })
        }
      }

      res.render("products/list", { data, role, errors, name })
    } catch (err) {
      console.log(err);

      res.send(err)
    }
  }

  static async showAddProduct(req, res) {
    try {
      res.render("products/add")
    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = ProductController