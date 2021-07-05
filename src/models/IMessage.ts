import {IUser} from "./IUser";
import {IDialog} from "./IDialog";

export interface IMessage {
    _id: string,
    user: IUser,
    text: string,
    dialog: IDialog
    read: boolean,
}