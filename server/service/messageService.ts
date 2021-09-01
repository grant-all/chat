import messageModel, {IMessage} from "../models/messageModel";
import dialogModel, {IDialog} from "../models/dialogModel";
import {IFile} from "../models/fileModels";
import fileService from "./fileService";
import axios from "axios";

class MessageService {
    async getMessages(dialogId) {
        const messages: IMessage[] = await messageModel.find({dialog: dialogId})
            .populate(["dialog", "user", "attachments"])//Сделать attachments!!!!!!!!!!!!!!!

        console.log("Bye")

        if(!messages) {
            throw new Error("Сообщения не найдены")
        }

        return messages
    }

    async create(userId: string, dialogId: string, text: string, attachments: string[]) {
        let message: IMessage = await messageModel.create({text, dialog: dialogId, user: userId, attachments})
        const dialog = await dialogModel.findByIdAndUpdate(
            dialogId,
            {lastMessage: message._id},
            {upsert: true})

        if(!dialog) {
            throw new Error()
        }

        await messageModel.populate(message, "attachments dialog user")
        return message.save()
    }

    async updateReadStatus(userId, dialogId) {
        const messages = await messageModel.updateMany({dialog: dialogId, user: {$ne: userId}}, {$set: {read: true}})

        if(!messages) {
            throw new Error()
        }
    }

    async delete(userId: string, messageId: string) {
        const message: IMessage = await messageModel.findById(messageId)
            .populate("dialog attachments",)

        if(!message) {
            throw new Error("Сообщение не найдено")
        }

        if(message.user.toString() !== userId) {
            throw new Error("Нет прав для удаления")
        }

        await Promise.all([(message.attachments as IFile[]).map(item => fileService.delete(item.name, item.ext))])

        const dialogId: string = message.dialog as string

        await message.remove()

        const dialog: IDialog = await dialogModel.findById(dialogId)

        if(!dialog)
            throw new Error("Диалог не найден")

        const lastMessage: IMessage = await messageModel.findOne({dialog: dialogId}, null, {sort: {createdAt: -1}})
        dialog.lastMessage = lastMessage ? lastMessage : null;

        await dialog.save()

        return message
    }
}

export default new MessageService()