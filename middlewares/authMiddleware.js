function isLoggedIn(req, res, next) {
  if (!req.session.userId) {
    let err = "please login first!"

    return res.redirect(`/login?errors=${err}`)
  }
  next()
}

module.exports = { isLoggedIn }