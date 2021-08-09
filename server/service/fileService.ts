import cloudinary from 'cloudinary'
import express from "express";
import fileModels, {IFile} from "../models/fileModels";
import {IUser} from "../models/userModel";

class FileService {
    cloud: cloudinary.ConfigOptions

    constructor() {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    async create(userId: IUser, file: string, res: express.Response): Promise<void> {
        await cloudinary.v2.uploader.upload(file, {resource_type: "auto"}, async (error: cloudinary.UploadApiErrorResponse, result: cloudinary.UploadApiResponse) => {
            if (error)
                throw new Error("Произошла ошибка при загрузке файлов")

                
            const fileData: Pick<IFile, "size" | "ext" | "url" | "user" | "duration">  = {
                size: result.bytes,
                ext: result.format,
                url: result.url,
                user: userId 
            }

            result.duration && (fileData.duration = result.duration)
            
            const uploadFile: IFile = await fileModels.create(fileData)
            console.log(uploadFile)
            await uploadFile.save()
            res.json(uploadFile)
        })
    }
}

export default new FileService()