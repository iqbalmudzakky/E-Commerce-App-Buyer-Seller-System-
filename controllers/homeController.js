class HomeController {
  static async home(req, res) {
    try {
      res.render("home")
    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = HomeController