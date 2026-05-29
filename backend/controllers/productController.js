const { Product, Cart, User } = require("../models");
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

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const { name, description, price, category, quantity } = req.body;

        const product = await Product.findOne({
            where: { id: productId }
        });

        if (!product) {
            return errorResponse(res, "Product not found", 400);
        }

        const updatedData = {};

        if (name !== undefined) updatedData.name = name
        if (description !== undefined) updatedData.description = description
        if (price !== undefined) updatedData.price = price
        if (category !== undefined) updatedData.category = category
        if (quantity !== undefined) updatedData.quantity = quantity


        await product.update(updatedData)

        return successResponse(res, "Product updated successfully", product)
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`)
    }
}

const createProduct = async (req, res) => {
    try {
        const { productId } = req.query;
        const { name, description, price, category, quantity } = req.body;

        if (!name || !price || !quantity) {
            return errorResponse(
                res,
                "Name, price and quantity are required",
                400
            );
        }

        const newProduct = await Product.create({
            name,
            description,
            quantity,
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

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);

        if (!product) {
            return errorResponse(res, "Product not found", 400);
        }

        if (Number(quantity) > product.quantity) {
            return errorResponse(
                res,
                "Requested quantity cannot be more than available products",
                400
            );
        }

        // const price = Number(product.price) * Number(quantity);

        let cartItem = await Cart.findOne({
            where: { userId, productId },
        });

        if (cartItem) {

            const updatedQuantity = Number(cartItem.quantity) + Number(quantity);

            if (updatedQuantity > product.quantity) {
                return errorResponse(
                    res,
                    "Requested quantity cannot be more than the available number of items",
                    400
                );
            }

            cartItem.quantity = updatedQuantity;
            // cartItem.quantity += Number(quantity);
            await cartItem.save();
        }
        else {
            cartItem = await Cart.create({
                userId,
                productId,
                name: product.name,
                quantity: quantity,
                description: product.description,
                price: product.price
            });
        }

        // npx sequelize-cli migration:create --name add-quantity--to-Product

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ['price']
                }
            ]
        })

        const cartTotal = cartItems.reduce((sum, item) => {
            return sum + (item.Product.price * item.quantity);
        }, 0);

        // const total = Number(cartItems.price * product.quanity);
        const itemTotal =
            Number(cartItem.price) * Number(cartItem.quantity);

        // const total = cartItems.reduce((sum, item) => {
        //     return sum + price;
        // }, 0);

        return successResponse(res, "Item successfully added to cart", {
            cartItem,
            cartTotal,
            itemTotal
        });
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id

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


        const itemTotal = Number(cartItem.price) * Number(cartItem.quantity);

        return successResponse(res, "Item removed from the cart", {
            cartItem,
            itemTotal
        });
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`)
    }

}

const getAllCartProductByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartProduct = await Cart.findAll({
            where: { userId }
        });

        if (cartProduct.length === 0) {
            return errorResponse(res, "No product in the cart");
        }

        const updatedCart = cartProduct.map((item) => {
            const item_total_price = Number(item.price) * Number(item.quantity);

            return {
                cartId: item.id,
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                description: item.description,
                price: item.price,
                item_total_price,
                user: {
                    id: userId,
                }
            }
        })

        const cart_total_price = updatedCart.reduce((sum, item) => {
            return sum + item.itemTotal;
        }, 0);

        return successResponse(res, "Cart fetched of the user", {
            cartProduct: updatedCart
        })
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`);
    }
}



module.exports = { getAllProducts, getProductById, createProduct, updateProduct, addToCart, removeFromCart, getAllCartProductByUserId };


// npx sequelize-cli migration:create --name add-quantity--to-Profduct
