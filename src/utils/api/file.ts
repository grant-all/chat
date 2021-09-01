import instance from "../../http";
import {IFile} from "../../models/IFile";

export default {
    upload: (file: File) => {
        const formData = new FormData()
        formData.append("file", file)
        return instance.post<IFile>("/files", formData)
    }
}