import express from "express";
import messageService from "../service/messageService";

class MessageController {
    async getMessages(req: express.Request, res:express.Response, next) {
        try {
            const userId = req.user.id
            const dialogId = req.query.dialogId
            await messageService.updateReadStatus(userId, dialogId)
            const messages = await messageService.getMessages(dialogId)
            return res.json(messages)
        } catch (e) {
            next(e)
        }

    }

    async create(req: express.Request, res:express.Response, next) {
        try {
            const {dialogId, text} = req.body
            const userId = req.user.id
            await messageService.updateReadStatus(userId, dialogId)
            const message = await messageService.create(userId, dialogId, text)
            return res.json(message)
        } catch (e) {
            next(e)
        }
    }
}

export default new MessageController()