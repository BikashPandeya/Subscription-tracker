import { Router } from "express";
import authorize from "../Middlewares/auth.middleware.js";

import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

// GET /users -> get all users
//GET /users/:id -> get a user by id

userRouter.get("/" ,authorize , getUsers)
userRouter.get("/:id" , authorize ,  getUser)
userRouter.post("/" , (req , res) => {title : "CREATE new user"})
userRouter.put("/:id" , (req , res) => {title : "UPDATE user"})
userRouter.get("/:id" , (req , res) => {title : "DELETE user"})

export default userRouter;