// controllers/homeController.js
class HomeController {
  static async home(req, res) {
    try {
      // [ADD] ambil info session untuk navbar dan hero yang sadar-role
      const role = req.session?.role || null;  // 'buyer' | 'seller' (lihat productController)
      const name = req.session?.name || null;

      // [ADD] Ambil beberapa kategori untuk highlight grid di landing
      // NOTE: require langsung di sini untuk menghindari circular di beberapa setup
      const { Category } = require("../models");
      const categories = await Category.findAll({
        limit: 6,
        order: [["name", "ASC"]],
        attributes: ["id", "name"]
      });

      // [ADD] Featured hero categories (sementara hardcoded placeholder)
      // Ganti id & imageUrl sesuai kategori dan gambar milikmu.
      const featuredCategories = [
        // contoh: Elektronik
        { id: 1, name: "Elektronik", imageUrl: "https://via.placeholder.com/800x300?text=Elektronik" },
        // contoh: Pakaian
        { id: 2, name: "Pakaian", imageUrl: "https://via.placeholder.com/800x300?text=Pakaian" },
        // contoh: Rumah Tangga (opsional, boleh hapus jika mau 2 saja)
        { id: 3, name: "Rumah Tangga", imageUrl: "https://via.placeholder.com/800x300?text=Rumah+Tangga" },
      ];

      // [ADD] Title untuk <title> dan H1 opsional
      const title = "Home Page";

      // [UPDATE] render home dengan data yang dibutuhkan landing
      res.render("home", { title, role, name, categories, featuredCategories });
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = HomeController;
