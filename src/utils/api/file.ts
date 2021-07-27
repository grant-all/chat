import instance from "../../http";
import {IFile} from "../../models/IFile";

export default {
    upload: (file: string) => {
        return instance.post<IFile>("/files", {file})
    }
}