import messageModel, {IMessage} from "../models/messageModel";
import dialogModel, {IDialog} from "../models/dialogModel";
import {IFile} from "../models/fileModels";

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

    async create(userId: string, dialogId: string, text: string, attachments: IFile[]) {
        console.log(attachments)
        let message: IMessage = await messageModel.create({text, dialog: dialogId, user: userId, attachments})
        console.log()
        console.log()
        console.log()
        const dialog = await dialogModel.findByIdAndUpdate(
            dialogId,
            {lastMessage: message._id},
            {upsert: true})

        if(!dialog) {
            throw new Error()
        }
        console.log(message)
        await messageModel.populate(message, "attachments dialog user")
        console.log(message)
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
            .populate("dialog")

        if(!message) {
            throw new Error("Сообщение не найдено")
        }

        if(message.user.toString() !== userId) {
            throw new Error("Нет прав для удаления")
        }

        const dialogId: string = message.dialog as string
        await message.remove()
        console.log("Сообщение удалено")
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