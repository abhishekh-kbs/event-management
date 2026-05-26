const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_secret: process.env.RAZORPAY_KEY_SECRET,
    key_id: process.env.RAZORPAY_KEY_ID
});

module.exports = razorpay;