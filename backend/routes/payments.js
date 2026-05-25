const express = require('express');
const router = express.Router();
const { createOrder, verifyPayments } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware.js');


router.post('/create-order/:id', verifyToken, createOrder);
router.post('/verify-payment', verifyToken, verifyPayments);

module.exports = router;