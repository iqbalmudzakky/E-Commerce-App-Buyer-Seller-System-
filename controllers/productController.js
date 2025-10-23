const { Product, User, Category, Profile } = require("../models")

class ProductController {
  static async showProduct(req, res) {
    try {
      const { errors } = req.query

      let role = req.session.role
      let data

      if (role === "buyer") {
        data = await Product.findAll({
          include: [{
            model: User,
            include: Profile
          }, Category]
        })
      } else if (role === "seller") {
        data = await Product.findAll({
          include: [{
            model: User,
            where: {
              id: req.session.userId
            },
            include: Profile
          }, Category]
        })
      }
      // res.json(data)
      res.render("products/list", { data, role, errors })
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