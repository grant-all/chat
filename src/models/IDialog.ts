import {IMessage} from "./IMessage";
import {IUser} from "./IUser";

export interface IDialog {
    _id: string,
    partner: IUser;
    author:IUser,
    lastMessage: IMessage,
    countUnread: number,
    createdAt: Date,
    updatedAt: Date
}