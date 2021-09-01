import cloudinary from 'cloudinary'
import express from "express";
import DatauriParser from 'datauri/parser';
import path from "path"
import fileModels, {IFile} from "../models/fileModels";
import {IUser} from "../models/userModel";

class FileService {
    parser: DatauriParser

    constructor() {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        this.parser = new DatauriParser()
    }

    async create(userId: IUser, file, res: express.Response): Promise<void> {
        const result = await cloudinary.v2.uploader.upload(
            this.parser.format(path.extname(file.originalname), file.buffer).content, {resource_type: "auto"}
        )

        if (!result) throw new Error("Произошла ошибка при загрузке файлов")

        const fileData: Pick<IFile, "name" | "size" | "ext" | "url" | "user" | "duration"> = {
            name: result.public_id,
            size: result.bytes,
            ext: result.format.replace("webm", "mp4"),
            url: result.url.replace("webm", "mp4"),
            user: userId,
        }

        result.duration && (fileData.duration = result.duration)

        const uploadFile: IFile = await fileModels.create(fileData)
        await uploadFile.save()
        console.log(uploadFile)
        res.json(uploadFile)
    }

    delete(name: string, type: string): void {
        cloudinary.v2.uploader.destroy(name, {resource_type: type === "mp4" ? "video" : "image"}, (error, result) => {
            if (error || result.result !== "ok") throw new Error("Ошибка при удалении файла")
        })
    }
}

export default new FileService()