import { Router } from "express";

const userRouter = Router();

// GET /users -> get all users
//GET /users/:id -> get a user by id

userRouter.get("/" , (req , res) => {title : "Get all users"})
userRouter.get("/:id" , (req , res) => {title : "Get users details"})
userRouter.post("/" , (req , res) => {title : "CREATE new user"})
userRouter.put("/:id" , (req , res) => {title : "UPDATE user"})
userRouter.get("/:id" , (req , res) => {title : "DELETE user"})

export default userRouter;