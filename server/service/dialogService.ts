import dialogModel from "../models/dialogModel";
import messageModel from "../models/messageModel";


class DialogService {
    async getDialogs(userId: string) {
        const dialogs = await dialogModel
            .find()
            .or([{author: userId}, {partner: userId}])
            .populate(["author", "partner"])
            .populate({
                path: "lastMessage",
                populate: {
                    "path": "user"
                }
            })

        if(!dialogs) {
            throw new Error("Диалоги не найдены")
        }
        return dialogs
    }

    async create(dataDialog, text: string) {
        const candidate = await dialogModel.findOne({author: dataDialog.author, partner: dataDialog.partner})

        if(candidate) {
            throw new Error("Такой диалог уже есть")
        }

        const dialog = await dialogModel.create({...dataDialog})

        const message = await messageModel.create({
            text,
            user: dialog.author,
            dialog: dialog._id
        })

        dialog.lastMessage = message._id

        return dialog.save()
    }

    async delete(id: string) {
        const dialog = await dialogModel.findByIdAndDelete(id)

        if(!dialog) {
            throw new Error("Диалог не найден")
        }

        return dialog
    }


}

export default new DialogService()