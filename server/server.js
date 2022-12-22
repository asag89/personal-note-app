

import express from "express"
import dotenv from "dotenv"


dotenv.config()
const app = express()


// error handling package
import "express-async-errors"

import connectDB from "./db/connect.js"

// routers
import authRouter from "./routes/authRoutes.js"
import goalRouter from "./routes/goalRoutes.js"
import noteRouter from "./routes/noteRoutes.js"

//middleware
import errorHandlerMiddleware from "./middleware/errorHandler.js"
import notFoundMiddleware from "./middleware/notFound.js"

app.use(express.json())

// middleware
app.use("/api/auth", authRouter)
app.use("/api/goals", goalRouter)
app.use("/api/notes", noteRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...\nconnected to db`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()