import express, {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {Server} from "socket.io";
import MessageController from "../controllers/messageController";

function createMessageRouter(io: Server): Router {
    const messageRouter: Router = express.Router()
    const messageController: MessageController = new MessageController(io)

    messageRouter.get("/", authMiddleware, messageController.getMessages.bind(messageController))
    messageRouter.post("/", authMiddleware, messageController.create.bind(messageController))
    messageRouter.delete("/:id", authMiddleware, messageController.delete.bind(messageController))

    return messageRouter
}


export default createMessageRouter