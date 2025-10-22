function isSeller(req, res, next) {
  if (req.session.role === "seller") {
    return next()
  }
  let err = "Only buyer can access this page"
  res.redirect(`/products?errors=${err}`)
}

function isBuyer(req, res, next) {
  if (req.session.role === "buyer") {
    return next()
  }
  let err = "Only seller can access this page"
  res.redirect(`/products?errors=${err}`)
}

module.exports = { isSeller, isBuyer }