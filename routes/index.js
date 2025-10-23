const express = require("express")
const router = express.Router()

const userRoutes = require("./user")
const productRoutes = require("./product")
const categoryRoutes = require("./category")
const wishlistRoutes = require('./wishlist');

const HomeController = require("../controllers/homeController")
const { isLoggedIn } = require("../middlewares/authMiddleware")

router.get("/", HomeController.home)

// Auth
router.use("/", userRoutes) // <<-- login process

router.use(isLoggedIn) // <<-- auth process

// Product
router.use("/products", productRoutes)

// Category
router.use("/categories", categoryRoutes);

// Wishlist
router.use('/wishlist', wishlistRoutes);

/*
Index Routes
/	GET	Home page

User Routes
/register	GET/POST	Register form
/login	GET/POST	Login form
/logout	GET	Logout dan redirect ke login

Product Routes
/products	GET	Menampilkan list produk
/products/add	GET/POST	Menambahkan produk baru
/products/:id/edit	GET/POST	Mengedit produk
/products/:id/delete	GET	Menghapus produk

Category Routes
/categories	GET	Menampilkan list kategori dan produk di dalamnya
/categories/add	GET/POST Menambahkan kategori baru

Wishlist Routes
/wishlist	GET	Menampilkan wishlist produk milik buyer
/wishlist/:userId/buyNow GET generate invoice + QR
/wishlist/:userId/success GET generate invoice + QR
*/

module.exports = router