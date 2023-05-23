const AppError = require("../utils/appError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (userId, userEmail) => {
    const token = jwt.sign({ userId, userEmail }, "test", {
        expiresIn: '1d',
    });
    return token;
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "test");
        return decoded;
    } catch (err) {
        return null;
    }
};

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};


const comparePasswords = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return next(new AppError('No token provided', 401));
    }

    return verifyToken(token);
}

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePasswords,
    authenticateToken
};
