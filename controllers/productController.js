const { Product, User, Category } = require("../models")

class ProductController {
  static async showProduct(req, res) {
    try {
      // let data = await Product.findAll({
      //   include: [User, Category]
      // })

      // res.json(data)

      res.render("products/list")
    } catch (err) {
      console.log(err);

      res.send(err)
    }
  }
}

module.exports = ProductController