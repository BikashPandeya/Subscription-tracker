//req.body is a object containing the data that is sent to the server from the client(POST request)


import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET , JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async(req , res , next) => {
    //Implement the signup logic

    const session = await mongoose.startSession()
    session.startTransaction() //Start a new transaction which means that the data will be saved only if all the operations are successful

    try {
        //Login to create a new user
        const {name , email , password} = req.body

        //Check if a user already exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            const error = new Error("user with this email already exists")
            error.statusCode = 409;
            throw error;
        }



        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        //Create a new user
        const newUser = await User.create([{name , email , password : hashedPassword} , {session}]) //Create a new user and pass the session which means that the data will be saved only if all the operations are successful

        const token = jwt.sign({userId : newUser[0]._id} , JWT_SECRET , {expiresIn : JWT_EXPIRES_IN}) 


        await session.commitTransaction() //Commit the transaction which in this case means that the data will be saved if all the operations are successful and everything is fine
    } catch (error) {
        await session.abortTransaction()
        session.endSession() //End the session if there is an error which means that the data will not be saved is any error occurs
        next(error) 
    }
}
export const signIn = async(req , res , next) => {
    //Implement the signup logic
}
export const signOut= async(req , res , next) => {
    //Implement the signup logic
}