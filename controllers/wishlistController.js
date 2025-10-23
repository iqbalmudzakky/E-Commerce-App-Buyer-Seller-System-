const qrcode = require("qrcode")
const { convertIDR, convertDate } = require("../helper/converterHelper");
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
    res.render('wishlist/list', { title: 'My Wishlist', data, convertIDR });
  }

  static async buyNow(req, res) {
    try {
      const { userId } = req.params

      let today = new Date()

      const invoice = `INV-${convertDate(today)}-${userId}`

      const paymentLink = `http://localhost:3000/wishlist/${userId}/success`

      const qrImage = await qrcode.toDataURL(paymentLink)

      res.render("wishlist/invoice", { invoice, qrImage, paymentLink })
    } catch (err) {
      res.send(err)
    }
  }

  static async success(req, res) {
    try {
      const { userId } = req.params
      let user = await User.findByPk(userId, {
        include: Profile
      })
      let name = user.Profile.fullName

      res.render("wishlist/thankyou", { name })
    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = WishlistController;
