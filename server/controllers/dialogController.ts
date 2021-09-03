import express from "express";
import dialogService from "../service/dialogService";
import {IDialog} from "../models/dialogModel";
import {Server} from "socket.io";
import {IUser} from "../models/userModel";
import {IOnlineUser} from "../models/onlineUserModel";
import onlineUserModel from "../models/onlineUserModel";
import {log} from "util";


class DialogController {
    io: Server;

    constructor(io: Server) {
        this.io = io
    }


    async getDialogs(req: express.Request, res:express.Response, next) {
        try {
            const userId: string = req.user._id
            const dialogs: IDialog[] = await dialogService.getDialogs(userId);
            const onlineUsers = new Map((await onlineUserModel.find({user: {$in: dialogs.map(dialogObj => (dialogObj.author as IUser)._id)
                        .concat(dialogs.map(dialogObj => (dialogObj.partner as IUser)._id))}})).map(item => [item.user.toString(), ""]))
            // console.log(onlineUsers)
            // console.log(dialogs)
            // console.log((dialogs[0].partner as IUser)._id)
            // for(const item of onlineUsers.keys()) {
            //     console.log(item === (dialogs[0].partner as IUser)._id.toString())
            // }

            const result = dialogs.map(dialogObj => {
                const dialogItem = dialogObj.toObject()
                if(onlineUsers.has((dialogItem.partner as IUser)._id.toString()))
                    (dialogItem.partner as IUser).isOnline = true
                else if(onlineUsers.has((dialogItem.author as IUser)._id.toString()))
                    (dialogItem.author as IUser).isOnline = true

                return dialogItem
            })
            console.log(result)
            res.json(result)
        } catch (e) {
            next(e)
        }

    }

    async create(req: express.Request, res:express.Response, next) {
        try {
            const dataDialog = {
                author: req.user._id,
                partner: req.body.partner
            }

            const dialog: IDialog = await dialogService.create(dataDialog, req.body.text)
            return res.json(dialog)
        }

        catch (e) {
            next(e)
        }
    }

    async delete(req: express.Request, res:express.Response, next) {
        try {
            const id: string = req.params.id
            const dialog: IDialog = await dialogService.delete(id, req.user._id)

            return res.json(dialog)
        } catch (e) {
            next(e)
        }
    }
}

export default DialogController