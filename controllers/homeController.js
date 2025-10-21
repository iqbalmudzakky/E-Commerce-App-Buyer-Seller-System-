class HomeController {
  static async home(req, res) {
    try {
      res.render("home")
    } catch (err) {
      console.log(err);
      res.send(err)
    }
  }
}

module.exports = HomeController