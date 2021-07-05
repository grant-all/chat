import {IUser} from "../models/userModel";
import cloudinary from 'cloudinary'
import fileModels, {IFile} from "../models/fileModels";
import * as mongoose from "mongoose";

class FileService {
    cloud: cloudinary.ConfigOptions

    constructor() {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    async create(userId: IUser, file: Express.Multer.File) {
        cloudinary.v2.uploader.upload_stream(async (error: cloudinary.UploadApiErrorResponse, result: cloudinary.UploadApiResponse) => {
            if(error)
                throw new Error("Произошла ошибка при загрузке файлов")

            const fileData: Pick<cloudinary.UploadApiResponse, "filename" | "size" | "ext" | "url" | "user"> = {
                filename: result.original_filename,
                size: result.size,
                ext: result.format,
                url: result.url,
                user: userId
            }

            const uploadFile: IFile & mongoose.Document = await fileModels.create(fileData)

            await uploadFile.save()
        })
            .end(file.buffer)
    }
}

export default new FileService()