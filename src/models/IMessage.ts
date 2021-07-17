import {IUser} from "./IUser";
import {IDialog} from "./IDialog";
import {IFile} from './IFile'

export interface IMessage {
    _id: string,
    user: IUser,
    text: string,
    dialog: IDialog
    read: boolean,
    createdAt: Date,
    updatedAt: Date,
    attachments: IFile[]
}