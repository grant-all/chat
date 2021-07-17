import {IMessage} from "../../models/IMessage";
import instance from "../../http";



export default {
    getAll: (dialogId: string) => instance.get<IMessage[]>(`/messages?dialogId=${dialogId}`),
    send: (text: string, dialogId: string, attachments?: any) => instance.post<IMessage>("/messages/", {text, dialogId, attachments}),
    delete: (messageId: string) => instance.delete<IMessage>(`/messages/${messageId}`)
}