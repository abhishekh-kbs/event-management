const razorpay = require("razorpay");
const { Event, Order } = require("../models");
const { Op } = require('sequelize');
const { errorResponse, successResponse } = require("../utils/responseHelper");

const createOrder = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const { id } = req.params;

        const event = await Event.findOne({ where: { id: req.params.id } });


        if (!event) {
            return errorResponse(res, "Event not found", 500)
        }

        if (event.priceAmount === 0) {
            return errorResponse(res, "Event is already free", 500)
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
            amount: Math.round(event.priceAmount * 100),  // paise
            currency: event.priceCurrency || 'INR',
            receipt: `receipt_event_${id}_user_${req.user.id}`
        });

        const order = await Order.create({
            razorpay_order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            receipt: razorpayOrder.receipt,
            paymentStatus: 'pending',
            eventId: id,
        });

        return successResponse(res, true, {
            order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order: order
        })
    }
    catch (err) {
        next(err);
    }
}


// concatenation between the string of order_id and payment_id and than combining it with the signature and hashed them with HSA 256
const verifyPayments = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId } = req.body;
        // const { paymentStatus } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (!expectedSignature) {
            errorResponse(res, "Invalid payment signature", 400);
        }

        const existing = await Registration.findOne({
            where: { userId: req.user.id, eventId }
        });

        if (existing) {
            return errorResponse(res, "Already registered", 400)
        };

        await Registration.create({
            userId: req.user.id,
            eventId,
            paymentId: razorpay_payment_id,
            paymentStatus: 'pending',
            status: 'registered'
        });

    }
    catch (err) {
        next(err)
    }
}

module.exports = { createOrder, verifyPayments }


// npx sequelize-cli migration:generate --name create-orders
// 