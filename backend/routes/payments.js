const express = require('express');
const router = express.Router();
const { createOrder, verifyPayments } = require('../controllers/paymentController');
const { handleWebhook } = require('../controllers/webhookController')
const { verifyToken } = require('../middleware/authMiddleware.js');


router.post('/create-order', verifyToken, createOrder);
router.post('/verify-payment', verifyToken, verifyPayments);

router.post('/webhook', handleWebhook)
module.exports = router;