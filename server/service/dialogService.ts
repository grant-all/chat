import userModel from "../models/userModel";
import dialogModel from "../models/dialogModel";
import messageModel from "../models/messageModel";

class DialogService {
    async create(dataDialog: Object, text: string) {
        const candidate = await userModel.findOne({author: dataDialog})

        if(candidate) {
            throw new Error("Такой диалог уже есть")
        }

        const dialog = await dialogModel.create(dataDialog)

        const message = await messageModel.create({
            text,
            user: dialog.author,
            dialog: dialog._id
        })

        dialog.lastMessage = message._id

        return dialog.save()
    }
}

export default new DialogService()