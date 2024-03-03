const User = require('../models/user')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded?.userId);
            req.user = user;
            next();
        } catch (error) {
            throw new Error("The token is invalid");
        }
    } else {
        throw new Error("There is no token attached to the header!");
    }
});

module.exports = {authMiddleware}


