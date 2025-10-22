const express = require("express")
const WishlistController = require("../controllers/wishlistController")

const router = express.Router()

router.get("/", WishlistController.showCategory)

/*
Wishlist Routes
/wishlist	GET	Menampilkan wishlist produk milik buyer
*/

module.exports = router