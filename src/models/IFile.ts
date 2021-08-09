import {IMessage} from "../../server/models/messageModel";
import {IUser} from "../../server/models/userModel";

export interface IFile {
    _id: string,
    size: number,
    message: IMessage,
    user: IUser | string,
    url: string,
    ext: string
    duration: number
}