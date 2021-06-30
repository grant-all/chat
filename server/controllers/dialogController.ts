import express from "express";
import dialogService from "../service/dialogService";


class DialogController {
    async create(req: express.Request, res:express.Response, next) {
        try {
            const dataDialog: Object = {
                author: req.body.author,
                partner: req.body.partner
            }

            const dialog = dialogService.create(dataDialog, req.body.text)

            return res.json(dialog)
        }

        catch (e) {
            next(e)
        }
    }
}

export default new DialogController()