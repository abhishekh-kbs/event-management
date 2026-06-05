const crypto = require("crypto");
const { successResponse, errorResponse } = require("../utils/responseHelper");

const handleWebhook = async (req, res) => {
    try {
        const webhookSignature = req.headers["x-razorpay-signature"];

        if (!webhookSignature) {
            return errorResponse(res, "No signature found", 400)
        }

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_WEBHOOK_SECRET
            )
            .update(req.body)
            .digest('hex');

        if (expectedSignature !== webhookSignature) {
            return errorResponse(res, "Invalid payment signature", 400);
        }

        const payload = JSON.parse(req.body.toString());
        const event = payload.event;

        console.log("Webhook event received:", event);

        switch (event) {
            case "payment.captured":
                console.log("Payment captured:", payload.payload.payment.entity);
                // TODO: update order status to paid in DB
                break;

            case "payment.failed":
                console.log("Payment failed:", payload.payload.payment.entity);
                // TODO: update order status to failed in DB
                break;

            case "order.paid":
                console.log("Order paid:", payload.payload.order.entity);
                // TODO: update order status in DB
                break;

            default:
                console.log("Unhandled event:", event);
        }
        console.log("Webhook hit");

        return successResponse(res, "Webhook received")

    }

    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

module.exports = { handleWebhook } 