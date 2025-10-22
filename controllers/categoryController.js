const { Category, Product } = require("../models");

class CategoryController {
  // ======================================================
  // GET /categories
  // Menampilkan seluruh kategori dari tabel Categories
  // ======================================================
  static async showCategory(req, res) {
    try {
      const categories = await Category.findAll({
        order: [["name", "ASC"]],
      });

      res.render("categories/list", {
        title: "Category List",
        categories,
      });
    } catch (err) {
      console.log("CategoryController.showCategory error =>", err);
      res.status(500).send(err);
    }
  }

  // ======================================================
  // GET /categories/add
  // Menampilkan form tambah kategori baru
  // ======================================================
  static showAddCategory(req, res) {
    res.render("categories/add", {
      title: "Tambah Kategori",
      error: null,
      oldInput: {},
    });
  }

  // ======================================================
  // POST /categories/add
  // Proses input form tambah kategori baru
  // ======================================================
  static async addCategory(req, res) {
    try {
      const { name } = req.body;

      // Validasi manual sederhana
      if (!name || !name.trim()) {
        throw new Error("Nama kategori tidak boleh kosong");
      }

      // Cek duplikat
      const exist = await Category.findOne({
        where: { name: name.trim() },
      });
      if (exist) {
        throw new Error("Kategori sudah ada");
      }

      // Simpan ke database
      await Category.create({ name: name.trim() });

      // Redirect kembali ke halaman daftar kategori
      res.redirect("/categories");
    } catch (err) {
      console.log("CategoryController.addCategory error =>", err.message);
      res.render("categories/add", {
        title: "Tambah Kategori",
        error: err.message,
        oldInput: req.body,
      });
    }
  }

  // ======================================================
  // GET /categories/:id
  // Menampilkan produk-produk di dalam kategori tertentu
  // ======================================================
  static async showDetail(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id, {
        include: [Product],
      });

      if (!category) {
        return res.status(404).send("Kategori tidak ditemukan");
      }

      res.render("categories/detail", {
        title: `Produk dalam ${category.name}`,
        category,
      });
    } catch (err) {
      console.log("CategoryController.showDetail error =>", err);
      res.status(500).send(err);
    }
  }
}

module.exports = CategoryController;
