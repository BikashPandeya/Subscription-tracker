import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res , next) => {
    try {
        const subscription = await Subscription.create({...req.body ,  //The ... syntax is the spread operator, which allows you to expand an iterable (like an object or array) into its individual elements. In this context, it spreads the properties of req.body into the new object being created for the subscription.
            user : req.user._id,
        });

        res.status(201).json({
            success : true,
            message : "Subscription created successfully",
            data : subscription,
        });

    } catch (error) {
        next(error);
    }
}


export const getUserSubscriptions = async (req, res , next) => {
    try {
        //Check if the user is the same as the one in the token
        if(req.user.id != req.params.id) {
            const error = new Error("You are not owner of this account");
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user : req.params.id});

        res.status(200).json({
            success : true,
            message : "Subscriptions fetched successfully",
            data : subscriptions,
        });
        
        
    } catch (error) {
        next(error);
    }
}
