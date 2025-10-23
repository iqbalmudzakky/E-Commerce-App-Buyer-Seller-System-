const express = require('express');
const { isSeller, isBuyer } = require("../middlewares/roleMiddleware")
const WishlistController = require('../controllers/wishlistController');

const router = express.Router();

// Halaman wishlist sederhana (placeholder dulu)
router.get('/', isBuyer, WishlistController.list);

router.get('/:userId/buyNow', isBuyer, WishlistController.buyNow)

router.get('/:userId/success', WishlistController.success)

module.exports = router;
