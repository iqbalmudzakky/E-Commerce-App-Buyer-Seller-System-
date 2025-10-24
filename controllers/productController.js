const { Product, User, Category, Profile } = require("../models")

class ProductController {
  static async showProduct(req, res) {
    try {
      const { errors, search, msg, msgEdit, error } = req.query

      let name = req.session.name
      let role = req.session.role
      let userId = req.session.userId

      let data

      if (role === "buyer") {
        if (search) {
          data = await Product.getProductBySearch(userId, role, search, User, Profile, Category)
        } else {
          data = await Product.findAll({
            include: [{
              model: User,
              include: Profile
            }, Category],
            order: [["id"]]
          })
        }

      } else if (role === "seller") {
        if (search) {
          data = await Product.getProductBySearch(userId, role, search, User, Profile, Category)
        } else {
          data = await Product.findAll({
            include: [{
              model: User,
              where: {
                id: userId
              },
              include: Profile
            },
              Category],
            order: [["id"]]
          })
        }
      }
      console.log(name);

      res.render("products/list", { data, role, errors, name, msg, msgEdit, error })
    } catch (err) {
      console.log(err);

      res.send(err)
    }
  }

  static async showAddProduct(req, res) {
    try {
      const { errors } = req.query
      const role = req.session?.role || null;
      const name = req.session?.name || null;
      
      const categories = await Category.findAll({
        attributes: ['id', 'name']
      })
      
      res.render("products/add", { 
        errors: errors || undefined, 
        role, 
        name, 
        categories 
      })
    } catch (err) {
      res.send(err)
    }
  }

  static async addProduct(req, res) {
    try {
      const { name, description, price, CategoryId } = req.body
      const userId = req.session.userId

      await Product.create({ name, description, price, CategoryId, UserId: userId })

      res.redirect('/products?msg=Product added successfully')
    } catch (err) {
      console.log('ProductController.addProduct error =>', err);
      res.redirect('/products/add?errors=Failed to add product')
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params

      let product = await Product.findByPk(id)
      await product.destroy()

      let productName = product.name
      res.redirect(`/products?msg=${productName}`)
    } catch (err) {
      // console.log(err);
      res.send(err)
    }
  }

  static async showEditProduct(req, res) {
    try {
      const { id } = req.params
      const role = req.session?.role || null;
      const name = req.session?.name || null;

      let categories = await Category.findAll({
        attributes: ['id', 'name']
      })
      let data = await Product.findByPk(id)

      res.render("products/edit", { data, categories, role, name })
    } catch (err) {
      res.send(err)
    }
  }

  static async editProduct(req, res) {
    try {
      const { name, description, price, CategoryId } = req.body
      const { id } = req.params

      let instance = await Product.findByPk(id)
      await instance.update({ name, description, price, CategoryId })

      let nameProduct = instance.name

      res.redirect(`/products?msgEdit=${nameProduct}`)
    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = ProductController