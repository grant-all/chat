import mongose, {Schema, Document} from 'mongoose'
import {IUser} from "./userModel";
import MessageScheme, {IMessage} from "./messageModel";

export interface IDialog {
    partner: IUser;
    author:IUser,
    messages: IMessage[],
    lastMessage: IMessage
}

const DialogScheme = new Schema<IDialog>({
    partner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    messages: {type: [MessageScheme]},
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }
})

export default mongose.model<IDialog>("Message", DialogScheme)