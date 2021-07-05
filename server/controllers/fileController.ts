import express from "express";
import cloudinary from 'cloudinary';
import fileModels, {IFile} from "../models/fileModels";
import * as mongoose from "mongoose";
import fileService from "../service/fileService";
import {IUser} from "../models/userModel";


class FileController {
    async create(req: express.Request, res:express.Response, next) {
        try {
            const userId: IUser = req.user.id;
            const file: Express.Multer.File = req.file

            await fileService.create(userId, file)

        } catch (e) {
            next(e)
        }

    }
}

export default new FileController()