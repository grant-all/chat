import instance from "../../http";
import {IDialog} from "../../models/IDialog";

export default {
    getAll: () => instance.get<IDialog[]>("/dialogs"),
    removeDialog: (dialogId: string) => instance.delete<IDialog>(`/dialogs/${dialogId}`)
}