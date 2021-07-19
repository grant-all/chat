import {IUser} from "../models/userModel";
import cloudinary from 'cloudinary'
import fileModels, {IFile} from "../models/fileModels";

class FileService {
    cloud: cloudinary.ConfigOptions

    constructor() {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    async create(userId: IUser, file: any) {
        console.log(file)
        await cloudinary.v2.uploader.upload(file, {resource_type: "auto"}, async (error: cloudinary.UploadApiErrorResponse, result: cloudinary.UploadApiResponse) => {
            if (error)
                throw new Error("Произошла ошибка при загрузке файлов")
            console.log(result)
            const fileData: Pick<IFile, "fileName" | "size" | "ext" | "url" | "user"> = {
                fileName: result.original_filename,
                size: result.bytes,
                ext: result.format,
                url: result.url,
                user: userId
            }

            console.log(fileData)

            const uploadFile: IFile = await fileModels.create(fileData)
            return await uploadFile.save()
        })
    }
}

export default new FileService()