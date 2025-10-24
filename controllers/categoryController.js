const { Category, Product, Sequelize, sequelize } = require("../models"); // [ADD] tambahkan Sequelize & sequelize untuk COUNT

// ======================================================
// CLASS: CategoryController
// ======================================================

class CategoryController {

  // ======================================================
  // GET /categories
  // Menampilkan seluruh kategori dari tabel Categories
  // [UPDATE] Sekarang menyesuaikan role user:
  //   - Buyer  => semua kategori
  //   - Seller => hanya kategori yang memiliki produk milik seller tsb
  // ======================================================
  
  static async showCategory(req, res) {
    try {
      // [ADD] ambil role & user id dari session
      const role = req.session?.role;      // 'Buyer' | 'Seller'
      const userId = req.session?.userId;  // id user login
      const name = req.session?.name || null;
      let categories;

      if (role === "Seller" && userId) {
        // [ADD] Seller: tampilkan hanya kategori yang punya produk milik seller ini
        categories = await Category.findAll({
          include: [
            {
              model: Product,
              attributes: [],               // hanya butuh filter, bukan datanya
              where: { UserId: userId },
              required: true                // wajib ada produk milik seller
            }
          ],
          attributes: [
            "id",
            "name",
            // [ADD] hitung jumlah produk milik seller per kategori
            [sequelize.fn("COUNT", sequelize.col("Products.id")), "productCount"]
          ],
          group: ["Category.id"],
          order: [["name", "ASC"]],
        });
      } else {
        // [KEEP] Buyer (atau fallback): tampil semua kategori seperti sebelumnya
        categories = await Category.findAll({
          order: [["name", "ASC"]],
        });
      }

      // [ADD] kirim role ke view (opsional untuk badge di UI)
      res.render("categories/list", {
        title: "Category List",
        categories,
        role,
        name,
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
    const role = req.session?.role || null;
    const name = req.session?.name || null;
    
    res.render("categories/add", {
      title: "Tambah Kategori",
      error: null,
      oldInput: {},
      role,
      name,
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
      const role = req.session?.role || null;
      const name = req.session?.name || null;
      
      res.render("categories/add", {
        title: "Tambah Kategori",
        error: err.message,
        oldInput: req.body,
        role,
        name,
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
