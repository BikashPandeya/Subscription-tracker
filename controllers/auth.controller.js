//req.body is a object containing the data that is sent to the server from the client(POST request)

import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  //Implement the signup logic

  const session = await mongoose.startSession();
  session.startTransaction(); //Start a new transaction which means that the data will be saved only if all the operations are successful

  try {
    //Login to create a new user
    const { name, email, password } = req.body;
    console.log(req.body);

    console.log(name, email, password);

    //Check if a user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("user with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create a new user
    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    //Create a new user and pass the session which means that the data will be saved only if all the operations are successful

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction(); //Commit the transaction which in this case means that the data will be saved if all the operations are successful and everything is fine
    session.endSession(); //End the session

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser, // No need for indexing (newUser[0])
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession(); //End the session if there is an error which means that the data will not be saved is any error occurs
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  //Implement the signup logic
  try {
    const {email , password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        const error = new Error("User with this email does not exist");
        error.statusCode = 404;
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({userId : user._id} , JWT_SECRET , {
        expiresIn : JWT_EXPIRES_IN
    });

    res.status(200).json({
        success : true,
        message : "User signed in successfully",
        data : {
            token,
            user
        }
    });

  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  //Implement the signup logic
};
