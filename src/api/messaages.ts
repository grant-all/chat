import api from "../http";
import {IMessage} from "../models/IMessage";

export default {
    getAll: (dialogId: string) => api.get<IMessage[]>(`/messages?dialogId=${dialogId}`),
    send: (text: string, dialogId: string, attachments: any) => api.post<IMessage>("messages/create", {text, dialogId, attachments}),
    remove: (messageId: string) => api.delete<IMessage>(`/messages/${messageId}`)
}