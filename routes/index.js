const express = require("express")
const router = express.Router()

const userRoutes = require("./user")
const productRoutes = require("./product")
const categoryRoutes = require("./category")

const HomeController = require("../controllers/homeController")

router.get("/", HomeController.home)

// User
router.use("/", userRoutes)

// Product
// router.use("/products", productRoutes)

// Category
// router.use("/categories", categoryRoutes)

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
*/

module.exports = router