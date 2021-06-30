import mongose, {Schema, Document} from 'mongoose'
import {IUser} from "./userModel";
import {IDialog} from "./dialogModel";

export interface IMessage {
    user: IUser
    text: string,
    dialog: IDialog,
    read: boolean,
}

const MessageScheme = new Schema<IMessage>({
    user: {type: Schema.Types.ObjectId, ref: "User", require: true},
    text: String,
    dialog: {type: Schema.Types.ObjectId, ref: "Dialog", require: true},
    read: {type: Boolean, default: false}
})

export default mongose.model<IMessage>("Message", MessageScheme)