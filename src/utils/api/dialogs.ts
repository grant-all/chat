import instance from "../../http";
import {IDialog} from "../../models/IDialog";

export default {
    getAll: () => instance.get<IDialog[]>("/dialogs"),
    createDialog: (partner: string, text: string) => instance.post<IDialog>(`/dialogs/create`, {partner, text}),
    removeDialog: (dialogId: string) => instance.delete<IDialog>(`/dialogs/${dialogId}`)
}