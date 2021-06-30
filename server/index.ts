import express from "express";
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRouter'
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser());
app.use("/api", userRouter)
app.use(errorMiddleware)

const start = async ():Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL!, {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log("Start server"))
    } catch (e) {
        console.log(e)
    }
}


start()

