const crypto = require('crypto');
const razorpay = require('../config/payment');
const { Event, Order, Registration, Product, ProductOrder } = require("../models");
const { Op } = require('sequelize');
const { errorResponse, successResponse } = require("../utils/responseHelper");

const createOrder = async (req, res, next) => {
    try {
        const { productId, cartId } = req.body;
        const { userId } = req.user.id;

        let amount;
        let purchaseType;
        let receipt;

        if (cartId) {
            purchaseType = 'cart';

            const cartItem = await Cart.findAll({
                where: { userId },
                include: [
                    { model: Product }
                ]
            })

            if (!cartItem.length) {
                return errorResponse(res, "Item not found", 500)
            }


        }

        const product = await Product.findOne({ where: { id: req.params.id } });


        if (!product) {
            return errorResponse(res, "product not found", 500)
        }

        const price = product.price

        if (product.price === 0) {
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
            amount: Math.round(price * 100),  // razorpay always accept payments converted into paise
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
        console.log({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            body
        });

        if (expectedSignature !== razorpay_signature) {
            return errorResponse(res, "Invalid payment signature", 400);
        }

        const existing = await ProductOrder.findOne({
            where: { userId: req.user.id, productId }
        });

        if (existing) {
            return errorResponse(res, "Already registered", 400)
        };

        const order = await Order.findOne({
            where: { razorpay_order_id }
        })

        if (!order) {
            return errorResponse(res, 'Order not found', 404);
        }

        await Order.update(
            {
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                amount: order.amount,
                paymentStatus: 'paid'
            },
            {
                where: { razorpay_order_id: razorpay_order_id }
            }
        )

        await ProductOrder.create({
            userId: req.user.id,
            productId,
            razorpay_order_id,
            amount: order.amount,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            paymentStatus: 'paid'
        });

        await Cart.destroy({
            where: {
                userId: req.user.id,
                productId: product
            }
        })


        return successResponse(res, true, "Payment verified and registration successful");

    }
    catch (err) {
        next(err)
    }
}

module.exports = { createOrder, verifyPayments }