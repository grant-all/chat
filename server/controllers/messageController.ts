import express from "express";
import messageService from "../service/messageService";
import {Server} from "socket.io";
import {ClientEvents, ServerEvents} from "../index";
import {IFile} from "../models/fileModels";

class MessageController {
    io: Server<ClientEvents, ServerEvents>

    constructor(io: Server<ClientEvents, ServerEvents>) {
        this.io = io
    }


    async getMessages(req: express.Request, res:express.Response, next: express.NextFunction):Promise<void> {
        try {
            const userId:string = req.user._id
            const dialogId:string = req.query.dialogId as string
            await messageService.updateReadStatus(userId, dialogId)
            console.log("Hello")
            const messages = await messageService.getMessages(dialogId)
            res.json(messages)
            this.io.to(dialogId).emit("messages:readed", dialogId, userId)
        } catch (e) {
            next(e)
        }

    }

    async create(req: express.Request, res:express.Response, next: express.NextFunction):Promise<void> {
        try {
            const {dialogId, text, attachments}: {dialogId: string, text: string, attachments:IFile[]} = req.body
            const userId: string = req.user._id
            await messageService.updateReadStatus(userId, dialogId)
            const message = await messageService.create(userId, dialogId, text, attachments)
            res.json(message)
            console.log("dialogId" + dialogId)
            this.io.to(dialogId).emit("message:created", message)
        } catch (e) {
            next(e)
        }
    }

    async delete(req: express.Request, res:express.Response, next: express.NextFunction):Promise<void> {
        try {
            const messageId: string = req.params.id
            const userId: string = req.user._id

            const message = await messageService.delete(userId, messageId)
            res.json(message)
        } catch (e) {
            next(e)
        }
    }
}

export default MessageController