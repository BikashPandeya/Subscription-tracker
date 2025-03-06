//someone is making a request to get user details  -> authorize middle -> verify -> if valid -> next -> get user details
// Importing necessary modules and configurations
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware function to authorize users
const authorize = async (req, res, next) => {
    try {
        let token;
        
        // Check if the authorization header is present and starts with "Bearer"
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            // Extract the token from the authorization header
            token = req.headers.authorization.split(" ")[1];
        }

        // If no token is found, return an unauthorized response
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify the token using the JWT secret key
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user associated with the decoded token's userId
        const user = await User.findById(decoded.userId);

        // If no user is found, return an unauthorized response
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Attach the user object to the request object for use in subsequent middleware or route handlers
        req.user = user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If an error occurs (e.g., token verification fails), return an unauthorized response
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

// Export the authorize middleware function
export default authorize;
