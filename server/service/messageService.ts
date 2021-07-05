import messageModel, {IMessage} from "../models/messageModel";
import dialogModel from "../models/dialogModel";

class MessageService {
    async getMessages(dialogId) {
        const messages: IMessage[] = await messageModel.find({dialog: dialogId})
            .populate(["dialogs", "users", "attachments"])

        if(!messages) {
            throw new Error("Сообщения не найдены")
        }

        return messages
    }

    async create(userId, dialogId, text: string) {
        const message = await messageModel.create({text, dialog: dialogId, user: userId})
        const dialog = await dialogModel.findByIdAndUpdate(
            dialogId,
            {lastMessage: message._id},
            {upsert: true})

        if(!dialog) {
            throw new Error()
        }

        return message.save()
    }

    async updateReadStatus(userId, dialogId) {
        const messages = await messageModel.updateMany({dialog: dialogId, user: {$ne: userId}}, {$set: {read: true}})

        if(!messages) {
            throw new Error()
        }

    }
}

export default new MessageService()