const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check if the 'Authorization' header is present in the request
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
           // Extract only the token from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify that the token is valid using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'swst_mini_project_secret');

            // If valid, attach the decoded user information to the request object
            req.student = decoded;
            next(); // Allow the request to proceed to the next step
        } catch (error) {
            res.status(401).json({ message: "Access denied. Invalid token!" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided!" });
    }
};

module.exports = { protect };