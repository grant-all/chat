import express from "express";
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import http from 'http'
import {Server, Socket} from 'socket.io'

import "./types"
import userRouter from './routes/userRouter'
import errorMiddleware from "./middlewares/errorMiddleware";
import dialogRouter from './routes/dialogRouter'
import messageRouter from "./routes/messageRouter";
import fileRouter from "./routes/fileRouter";

const app = express()
const PORT: number = +process.env.PORT || 5000
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


app.use(express.json())
app.use(cookieParser());
app.use("/users", userRouter)
app.use("/dialogs", dialogRouter)
app.use("/messages", messageRouter)
app.use("/files", fileRouter)
app.use(errorMiddleware)

const start = async ():Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL!, {useNewUrlParser: true, useUnifiedTopology: true})
        server.listen(PORT, () => {
            console.log('listening on *:5000');
        });
    } catch (e) {
        console.log(e)
    }
}

io.on("connection", (socket: Socket) => {
    console.log("Hello")
})

start()

