import dialogModel, {IDialog} from "../models/dialogModel";
import messageModel from "../models/messageModel";
import {IUser} from "../models/userModel";


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

        const dialog = (await dialogModel.create({...dataDialog}))

        await dialogModel.populate(dialog, {path: "author partner"})

        const message = await messageModel.create({
            text,
            user: dialog.author,
            dialog: dialog._id
        })

        dialog.lastMessage = message

        return dialog.save()
    }

    async delete(id: string, userId: string): Promise<IDialog> {
        const dialog = await dialogModel.findById(id)


        if(!dialog) {
            throw new Error("Диалог не найден")
        }

        if((dialog.author as IUser)._id.toString() !== userId) {
            throw new Error("Нет прав для удаления")
        }

        return dialog.remove()
    }


}

export default new DialogService()