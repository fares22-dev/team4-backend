const jwt = require('jsonwebtoken');

async function authmiddleware(req, res, next) {
    try {
        // Retrieve the token from the Authorization header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        // If no token is provided, return Unauthorized
        if (!token) {
            return res.sendStatus(401); // Unauthorized
        }

        // Verify the token using the secret key
        const doctor = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the doctor object to the request for later use
        req.doctor = doctor;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.sendStatus(403); // Forbidden
    }
}

module.exports = authmiddleware;
