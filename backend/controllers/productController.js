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

// const updateProduct = async (req, res) => {
//     try {
//         const { name, description, price, category, quantity } = req.body;

//         const user = req.query;

//         const product = await Product.findByPk(productId);
//         if (!product) {
//             return errorResponse(res, "Product not found", 400);
//         }

//         const oldProductData = {
//             name: product.name,
//             description: product.description,
//             price: product.price,
//             category: product.price,
//             quantity: product.quantity
//         }

//         await product.update({
//             name, description, price, category, quantity
//         });

//         return errorResponse(res, "Product updated successfully", {
//             product: {
//                 name: product.name,
//                 description: product.description,
//                 price: product.price,
//                 category: product.price,
//                 quantity: product.quantity
//             }
//         })
//     }
//     catch (err) {
//         return errorResponse(res, `Internal Server Error: ${err.message}`)
//     }
// }

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

        if (!product) {
            return errorResponse(res, "Product not found", 400);
        }

        const price = Number(product.price) * Number(quantity);

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
                quantity: quantity,
                description: product.description,
                price: product.price
            });
        }


        const cartItems = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ['price']
                }
            ]
        })

        const total = cartItems.reduce((sum, item) => {
            return sum + (item.Product.price * item.quantity);
        }, 0);

        // const total = cartItems.reduce((sum, item) => {
        //     return sum + price;
        // }, 0);



        return successResponse(res, "Item successfully added to cart", {
            cartItem,
            total
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
        const userId = req.user.id

        // const cartItem = await Cart.findByPk(productId);

        const cartItem = await Cart.findOne({
            where: { productId }
        });
        const price = Number(cartItem.price);

        if (!cartItem) return errorResponse(res, "Item is not available in the cart")

        if (quantity > cartItem.quantity) {
            return errorResponse(res, "Number of item in the cart must be bigger than the requested item");
        }
        else if (quantity <= 0) {
            return errorResponse(res, "Invalid quantity")
        }

        cartItem.quantity -= quantity;
        await cartItem.save();


        if (cartItem.quantity == 0) {
            await cartItem.destroy();
            return successResponse(res, "Item completely removed from the cart", null);
        }

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ['price']
                }
            ]
        })

        const total = cartItems.reduce((sum, item) => {
            return sum - (item.Product.price * item.quantity);
        }, 0);



        return successResponse(res, "Item removed from the cart", {
            cartItem,
            price,
            total
        });
    }
    catch (err) {
        return errorResponse(res, `Internal Server Error: ${err.message}`)
    }

}

module.exports = { getAllProducts, getProductById, getAllCartProductByUserId, createProduct, addToCart, removeFromCart, getAllCartProduct };


// npx sequelize-cli migration:create --name add-quantity--to-Profduct
