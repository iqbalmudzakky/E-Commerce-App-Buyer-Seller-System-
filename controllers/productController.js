class ProductController {
  static async showProduct(req, res) {
    try {
      res.render("products/list")
    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = ProductController