import {IMessage} from "./messageModel";
import {IUser} from "./userModel";
import {Schema} from "mongoose";
import * as mongoose from "mongoose";

export interface IFile extends mongoose.Document{
    size: number,
    user: IUser | string,
    url: string,
    ext: string
}

export const FileScheme = new Schema<IFile>({
    size: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    url: {type: String, required: true},
    ext: {type: String, required: true}
})

export default mongoose.model<IFile>("File", FileScheme)