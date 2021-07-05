import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import messageController from '../controllers/messageController'

const messageRouter = express.Router()

messageRouter.get("/", authMiddleware, messageController.getMessages)
messageRouter.post("/create", authMiddleware, messageController.create)

export default messageRouter