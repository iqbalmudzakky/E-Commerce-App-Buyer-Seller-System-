const qrcode = require("qrcode")
const { convertIDR, convertDate } = require("../helper/converterHelper");
const { User, Profile, Product, Category, UserProduct } = require("../models")

class WishlistController {
  // GET /wishlist/add/:productId → add product to wishlist
  static async addToWishlist(req, res) {
    try {
      const { productId } = req.params;
      const userId = req.session.userId;

      // Check if product already in wishlist
      const existingWishlist = await UserProduct.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      });

      if (existingWishlist) {
        return res.redirect('/products?msg=Product already in wishlist');
      }

      // Add to wishlist
      await UserProduct.create({
        UserId: userId,
        ProductId: productId
      });

      res.redirect('/products?msg=Product added to wishlist successfully');
    } catch (err) {
      console.log('WishlistController.addToWishlist error =>', err);
      res.redirect('/products?error=Failed to add product to wishlist');
    }
  }

  // GET /wishlist → render placeholder
  static async list(req, res) {
    const role = req.session?.role || null;
    const name = req.session?.name || null;

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
    res.render('wishlist/list', { title: 'My Wishlist', data, convertIDR, role, name });
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
