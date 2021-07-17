import {IUser} from "../models/userModel";
import cloudinary from 'cloudinary'

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
        /*cloudinary.v2.uploader.upload_stream(async (error: cloudinary.UploadApiErrorResponse, result: cloudinary.UploadApiResponse) => {
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
            .end(file.buffer)*/
        console.log(file)
        await cloudinary.v2.uploader.upload(file, { resource_type: "auto" })
    }
}

export default new FileService()