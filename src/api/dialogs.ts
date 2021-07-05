import api from "../http";
import {IDialog} from "../models/IDialog";

export default {
    getAll: () => api.get<IDialog[]>("/dialogs"),
    removeDialog: (dialogId: string) => api.delete<IDialog>(`/dialogs/${dialogId}`)
}