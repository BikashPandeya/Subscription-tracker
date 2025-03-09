import express from "express"
import { PORT } from "./config/env.js"
import cookieParser from "cookie-parser"

import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import subscriptionRouter from "./routes/subscription.router.js"
import connectToDatabase from "./database/mongodb.js"
import errorMiddleware from "./Middlewares/error.middleware.js"
import arcjetMiddleware from "./Middlewares/arcjet.middleware.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/subscriptions" , subscriptionRouter)
app.use("/api/v1/workflow" , workflowRouter)
app.use(errorMiddleware)

app.get("/" , (req , res) => {
    res.send("Welcome to Subscription Tracker app")
})

app.listen(PORT,async () => {
    console.log(`Server is running on port http://localhost:${PORT}`)

    await connectToDatabase()
})