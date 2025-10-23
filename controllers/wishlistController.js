const { User, Profile, Product, Category } = require("../models")

class WishlistController {
  // GET /wishlist → render placeholder
  static async list(req, res) {

    let data = await User.findByPk(req.session.userId, {
      include: [Profile, {
        model: Product,
        include: [
          { model: User, include: Profile },
          { model: Category }
        ]
      }]
    })
    // res.json(data)
    res.render('wishlist/list', { title: 'My Wishlist', data });
  }
}

module.exports = WishlistController;
