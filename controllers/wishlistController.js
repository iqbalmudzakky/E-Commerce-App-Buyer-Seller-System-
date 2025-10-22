class WishlistController {
  // GET /wishlist → render placeholder
  static list(req, res) {
    console.log('[Wishlist] GET /wishlist (simple placeholder)');
    res.render('wishlist/list', { title: 'My Wishlist' });
  }
}

module.exports = WishlistController;
