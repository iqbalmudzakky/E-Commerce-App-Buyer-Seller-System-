const express = require("express")
const CategoryController = require("../controllers/categoryController")

const router = express.Router()

router.get("/", CategoryController.showCategory)

router.get("/add", CategoryController.showAddCategory)
router.post("/add", CategoryController.addCategory)

/*
Category Routes
/categories	GET	Menampilkan list kategori dan produk di dalamnya
/categories/add	GET/POST	Menambahkan kategori baru
*/

module.exports = router