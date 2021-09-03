import {IDialog} from "../../models/IDialog";
import {IMessage} from "../../models/IMessage";

export enum DialogActionTypes {
    FETCH_DIALOGS = "FETCH_DIALOGS",
    SET_CURRENT_DIALOG = "SET_CURRENT_DIALOG",
    SET_IS_ONLINE = "SET_IS_ONLINE",
    SET_IS_LOADING_DIALOG = "SET_IS_LOADING_DIALOG",
    FETCH_DELETE_DIALOG = "FETCH_DELETE_DIALOG",
    SET_READED_STATUS_LAST_MESSAGE = "SET_READED_STATUS_LAST_MESSAGE",
    DELETE_MESSAGE = "DELETE_MESSAGE",
    CREATE_DIALOG = "CREATE_DIALOG"
}

export interface DialogState {
    items: IDialog[],
    currentDialogId: string
    isLoading: boolean
}

export interface fetchDialogs {
    type: DialogActionTypes.FETCH_DIALOGS,
    payload: IDialog[]
}

export interface fetchDeleteDialog {
    type: DialogActionTypes.FETCH_DELETE_DIALOG,
    payload: string
}

export interface SetIsLoadingDialogAction {
    type: DialogActionTypes.SET_IS_LOADING_DIALOG,
    payload: boolean
}

export interface SetCurrentDialogAction {
    type: DialogActionTypes.SET_CURRENT_DIALOG,
    payload: string
}

export interface SetIsOnlineDialogAction {
    type: DialogActionTypes.SET_IS_ONLINE,
    payload: {
        userId: string,
        isOnline: boolean
    }
}

export interface SetReadedStatusLastMessageAction {
    type: DialogActionTypes.SET_READED_STATUS_LAST_MESSAGE,
    payload: string
}

export interface DeleteMessageAction {
    type: DialogActionTypes.DELETE_MESSAGE,
    payload: {
        message: IMessage,
        dialogId: string
    }
}

export interface CreateDialogAction {
    type: DialogActionTypes.CREATE_DIALOG,
    payload: IDialog
}

export type DialogActions = fetchDialogs |
    fetchDeleteDialog |
    SetIsLoadingDialogAction |
    SetCurrentDialogAction |
    SetReadedStatusLastMessageAction |
    DeleteMessageAction |
    SetIsOnlineDialogAction |
    CreateDialogAction