const crypto = require('crypto');
const razorpay = require('../config/payment');
const { Event, Order, Registration, Product, ProductOrder } = require("../models");
const { Op } = require('sequelize');
const { errorResponse, successResponse } = require("../utils/responseHelper");

const createOrder = async (req, res, next) => {
    try {
        console.log('KEY_ID     :', process.env.RAZORPAY_KEY_ID);
        console.log('KEY_SECRET :', process.env.RAZORPAY_KEY_SECRET);


        const { amount } = req.body;
        const { id } = req.params;

        const product = await Product.findOne({ where: { id: req.params.id } });


        if (!product) {
            return errorResponse(res, "product not found", 500)
        }

        if (product.priceAmount === 0) {
            return errorResponse(res, "product is already free", 500)
        }

        // const razorpayOrder = await razorpay.orders.create({
        //     amount: Math.round(event.priceAmount * 100),
        //     currency: event.priceCurrency,
        //     receipt: `receipt_event_${id}_user_${req.user.id}`
        // });

        // const order = await razorpay.orders.create(razorpayOrder);
        // const order = await Order.create({
        //     razorpay_order_id: razorpayOrder.id,
        //     amount: razorpayamount,
        //     paymentStatus: 'pending'
        // })

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(amount * 100),  // razorpay always accept payments converted into paise
            currency: product.priceCurrency || 'INR',
            receipt: `receipt_product_${id}_user_${req.user.id}`
        });

        const order = await Order.create({
            razorpay_order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            receipt: razorpayOrder.receipt,
            paymentStatus: 'pending',
            productId: id,
        });

        return successResponse(res, true, {
            order: order
        })
    }
    catch (err) {
        console.log('full error: ', err)
        next(err);
    }
}


// concatenation between the string of order_id and payment_id and than combining it with the signature and hashed them with HSA 256
const verifyPayments = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
        // const { paymentStatus } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // const key_secret = 'Hxpcavas5tWjjYKJekiE5WsY';
        // const razorpay_order_id = 'order_Stv3W8sKsl1re6';  // from createOrder response
        // const razorpay_payment_id = 'pay_TestFakeID123';

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        console.log('expectedSignature: ', expectedSignature)

        if (expectedSignature !== razorpay_signature) {
            return errorResponse(res, "Invalid payment signature", 400);
        }

        const existing = await ProductOrder.findOne({
            where: { userId: req.user.id, productId }
        });

        if (existing) {
            return errorResponse(res, "Already registered", 400)
        };

        await Order.update(
            {
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                paymentStatus: 'pending'
            },
            {
                where: { razorpay_order_id: razorpay_order_id }
            }
        )

        await ProductOrder.create({
            userId: req.user.id,
            productId,
            paymentId: razorpay_payment_id,
            paymentStatus: 'paid'
        });

        return successResponse(res, true, "Payment verified and registration successful");

    }
    catch (err) {
        next(err)
    }
}

module.exports = { createOrder, verifyPayments }