import mongoose, {Schema, Document} from 'mongoose'
import {IUser} from "./userModel";
import {IMessage} from "./messageModel";

export interface IDialog {
    partner: IUser | string;
    author:IUser | string;
    lastMessage: IMessage | string;
}

const DialogScheme = new Schema<IDialog>({
    partner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }
}, {timestamps: true})

export default mongoose.model<IDialog>("Dialog", DialogScheme)