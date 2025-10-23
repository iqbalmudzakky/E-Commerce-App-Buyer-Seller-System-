const express = require("express")
const { isSeller, isBuyer } = require("../middlewares/roleMiddleware")
const ProductController = require("../controllers/productController")

const router = express.Router()

router.get("/", ProductController.showProduct)

router.get("/add", isSeller, ProductController.showAddProduct)
// router.post("/add", ProductController.addProduct)

// router.get("/:id/edit", ProductController.showEditProduct)
// router.post("/:id/edit", ProductController.editProduct)

// router.get("/:id/delete", ProductController.deleteProduct)

/*
Product Routes
/products	GET	Menampilkan list produk
/products/add	GET/POST	Menambahkan produk baru
/products/:id/edit	GET/POST	Mengedit produk
/products/:id/delete	GET	Menghapus produk
*/

module.exports = router