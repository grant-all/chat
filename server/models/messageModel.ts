import mongoose, {Schema, Document} from 'mongoose'
import {IUser} from "./userModel";
import {IDialog} from "./dialogModel";
import {IFile} from "./fileModels";

export interface IMessage {
    user: IUser | string
    text: string,
    dialog: IDialog | string,
    read: boolean,
    attachments?: IFile
}

const MessageScheme = new Schema<IMessage>({
    user: {type: Schema.Types.ObjectId, ref: "User", require: true},
    text: String,
    dialog: {type: Schema.Types.ObjectId, ref: "Dialog", require: true},
    read: {type: Boolean, default: false},
    attachments: [{ type: Schema.Types.ObjectId, ref: 'File' }]
})

export default mongoose.model<IMessage>("Message", MessageScheme)