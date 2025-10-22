function isSeller(req, res, next) {
  if (req.session.role === "seller") {
    return next()
  }
  let err = "Only buyer can access this page"
  res.redirect(`/products?errors=${err}`)
}

// isBuyer

module.exports = { isSeller }