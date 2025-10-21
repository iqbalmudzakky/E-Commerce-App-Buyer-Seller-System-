const express = require("express")

const indexRoutes = require("./routes/index")

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use("/", indexRoutes)

/*
Index Routes
/	GET	Home page

Auth Routes
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
/categories/add	GET/POST	Menambahkan kategori baru

Wishlist Routes
/wishlist	GET	Menampilkan wishlist produk milik buyer
*/

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
})