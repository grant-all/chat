import express from "express";
import fileService from "../service/fileService";
import {IUser} from "../models/userModel";


class FileController {
    async create(req: express.Request, res:express.Response, next) {
        try {
            const userId: IUser = req.user._id;
            const file = req.body.file
            await fileService.create(userId, file, res)
        } catch (e) {
            next(e)
        }

    }
}

export default new FileController()