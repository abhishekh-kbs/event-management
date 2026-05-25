const { Product, Cart } = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHelper");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return successResponse(res, "Products fetched successfully", products);
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id }
        });

        if (!product) return errorResponse(res, "Product does not exist", 400);

        return successResponse(res, "Product fetched by ID", product);
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

const createProduct = async (req, res) => {
    try {
        const { productId } = req.query;
        const { name, description, price, category } = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            userId: req.user.id
        });

        return successResponse(res, "Product created successfully", newProduct);
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

const getAllCartProduct = async (req, res) => {
    try {
        const cartProduct = await Cart.findAll();
        return successResponse(res, "Cart fetched", cartProduct);
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

const getAllCartProductByUserId = async (req, res) => {
    try {
        const userId = req.query;

        const cartProduct = await Cart.findAll(userId);

        return successResponse(res, "Cart fetched of the user", cartProduct);
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);

        if (!productId) {
            return errorResponse(res, "Product ID is required", 400);
        }

        let cartItem = await Cart.findOne({
            where: { userId, productId }
        });

        if (cartItem) {
            cartItem.quantity += Number(quantity);
            await cartItem.save();
        }
        else {
            cartItem = await Cart.create({
                userId,
                productId,
                quantity: quantity,
                description: product.description,
                price: product.price
            });
        }

        return successResponse(res, "Item successfully added to cart", {
            cartItem
        });
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

// const cartDetailOfUser = async (req, res) => {
//     try {
//         const { userId, productId } = req.query;

//     }
//     catch (err) {
//         return errorResponse(res, `Internal Server Error: ${err.message}`)
//     }
// }

const removeFromCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // const cartItem = await Cart.findByPk(productId);

        const cartItem = await Cart.findOne({
            where: { productId }
        });

        if (!cartItem) return errorResponse(res, "Item is not available in the cart")

        if (quantity > cartItem.quantity) {
            return errorResponse(res, "Number of item in the cart must be bigger than the requested item");
        }
        else if (quantity <= 0) {
            return errorResponse(res, "Invalid quantity")
        }

        cartItem.quantity -= quantity;

        if (cartItem.quantity == 0) {
            await cartItem.destroy();
            return successResponse(res, "Item completely removed from the cart", null);
        }

        await cartItem.save();

        return successResponse(res, "Item removed from the cart", cartItem);
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`)
    }

}

module.exports = { getAllProducts, getProductById, getAllCartProductByUserId, createProduct, addToCart, removeFromCart, getAllCartProduct };

