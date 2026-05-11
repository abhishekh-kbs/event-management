const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { blackListedTokens } = require('../controllers/authController');
const { successResponse, errorResponse } = require('../utils/responseHelper');


const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        const token = authHeader.split(" ")[1];

        // optional blacklist check
        if (blackListedTokens.has(token)) {
            return res.status(401).json({ message: "Token expired, login again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            where: {
                id: decoded.id,
                isDeleted: false
            },
            attributes: ["id", "username", "email", "role"]
        });

        if (!user) {
            return res.status(401).json({ message: "Account no longer active" });
        }

        console.log("TOKEN:", token);
        console.log("DECODED:", decoded);

        req.user = user; // NOT decoded
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

const isCreator = (req, res, next) => {
    if (!req.user || req.user.role !== 'creator') {
        return res.status(403).json({
            message: 'Access denied - creators only'
        });
    }
    next();
};

const isUser = (req, res, next) => {
    if (!req.user || req.user.role !== 'user') {
        return res.status(403).json({
            message: 'Access denied - users only'
        });
    }
    next();
}

module.exports = { verifyToken, isCreator, isUser };