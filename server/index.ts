import express from "express";
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import http from 'http'
import {Server, Socket} from 'socket.io'


import errorMiddleware from "./middlewares/errorMiddleware";
import createRoutes from "./routes";
import {IMessage} from "./models/messageModel";
import "./types"
import onlineUserModel, {IOnlineUser} from "./models/onlineUserModel";

export interface ClientEvents {
    "dialog:typing": () => void;
    "message:create": (message: IMessage) => void;
    "message:read": (dialogId: string) => void;
    "dialog:join": (dialogId: string) => void;
}

export interface ServerEvents {
    "dialog:typing": () => void
    "message:created": (message: IMessage) => void;
    "messages:readed": (dialogId: string, userId: string) => void;
    "message:readed": (dialogId: string) => void;
    "user:online": (userId: string) => void;
    "user:disconnected": (userId: string) => void;
}

const app = express()
const PORT: number = +process.env.PORT || 5000
const server = http.createServer(app)
const io = new Server<ClientEvents, ServerEvents>(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
//export const users = new Map<string, number>()

app.use(express.json({limit: "100mb"}))
app.use(cookieParser())
createRoutes(app, io)
app.use(errorMiddleware)

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        server.listen(PORT, () => {
            console.log('listening on *:5000');
        });
    } catch (e) {
        console.log(e)
    }
}

io.on("connection", async (socket) => {
    const userId: string = socket.handshake.query.userId as string
    let user = await onlineUserModel.findOne({user: userId})

    if (!user) {
        user = await onlineUserModel.create({user: userId})
        socket.broadcast.emit("user:online", userId)
    }
    else {
        user.countTab += 1
        await user.save()
    }

    socket.on("dialog:join", dialogId => {
        socket.join(dialogId)
    })

    socket.on("dialog:typing", () => {
        socket.broadcast.emit("dialog:typing")
    })

    socket.on("message:read", (dialogId) => {
        socket.to(dialogId).emit("message:readed", dialogId)
    })

    socket.on("disconnect", async () => {
        user.countTab -= 1

        if(user.countTab === 0) {
            await user.delete()
            console.log("dis")
            socket.broadcast.emit("user:disconnected", userId)
            return
        }

        await user.save()
    })
})

start()

