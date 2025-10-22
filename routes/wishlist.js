const express = require('express');
const WishlistController = require('../controllers/wishlistController');

const router = express.Router();

// Halaman wishlist sederhana (placeholder dulu)
router.get('/', WishlistController.list);

module.exports = router;
