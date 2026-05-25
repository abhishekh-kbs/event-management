const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { getAllProducts, getProductById, createProduct, getAllCartProductByUserId, addToCart, removeFromCart, getAllCartProduct } = require('../controllers/productController');

router.get('/product', getAllProducts);
router.get('/product/:id', verifyToken, getProductById);
router.post('/create-products', verifyToken, createProduct);


router.get('/cart', getAllCartProduct);
router.get('/cart/:id', getAllCartProductByUserId);
router.put('/add-to-cart', verifyToken, addToCart);
router.put('/remove-from-cart', verifyToken, removeFromCart);

module.exports = router;