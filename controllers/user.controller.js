import User from "../models/user.model.js";

export const getUsers = async(req, res, next) => {
    try {
        // Get only the authenticated user's data
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
};


