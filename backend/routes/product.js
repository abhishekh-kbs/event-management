/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product APIs
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Products fetched successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get products by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Products fetched successfully using ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/routes/product/getAllProducts'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, category, quantity]
 *             properties:
 *               name:
 *                 type: string
 *                 example: JohnDoe
 *               description:
 *                 type: string
 *                 example: Lorem ipsum hello world
 *               price:
 *                 type: integer
 *                 example: 123
 *               category:
 *                 type: string
 *                 example: tech
 *               quantity:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Cart APIs
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all products in cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Cart fetched successfully
 *       400:
 *         description: Validation error
 */


/**
 * @swagger
 * /api/add-to-cart:
 *   post:
 *     summary: Add to cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to the cart successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/remove-from-cart:
 *   delete:
 *     summary: Product removed from cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product remove from cart successfully
 *       400:
 *         description: Validation error
 */


const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { getAllProducts, getProductById, createProduct, getMyProduct, updateProduct, deleteProduct, getAllCartProductByUserId, addToCart, removeFromCart, getAllCartProduct } = require('../controllers/productController');

router.get('/product', getAllProducts);
router.get('/product/my-product', verifyToken, getMyProduct);
router.post('/create-product', verifyToken, createProduct);
router.put('/update-product/:productId', verifyToken, updateProduct);
router.get('/product/:id', verifyToken, getProductById);
router.delete('/delete/:productId', verifyToken, deleteProduct);


router.post('/add-to-cart', verifyToken, addToCart);
router.delete('/remove-from-cart', verifyToken, removeFromCart);
router.get('/cart', verifyToken, getAllCartProductByUserId);

module.exports = router;