import express from "express";
import dialogService from "../service/dialogService";
import {IDialog} from "../models/dialogModel";
import {Server} from "socket.io";


class DialogController {
    io: Server;

    constructor(io: Server) {
        this.io = io
    }


    async getDialogs(req: express.Request, res:express.Response, next) {
        try {
            const userId: string = req.user._id
            const dialogs: IDialog[] = await dialogService.getDialogs(userId)
            res.json(dialogs)
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
            const dialog = await dialogService.delete(id)
            return res.json("Диалог удален")
        } catch (e) {
            next(e)
        }
    }
}

export default DialogController