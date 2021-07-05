import {IDialog} from "../../models/IDialog";

export enum DialogActionTypes {
    FETCH_DIALOGS = "FETCH_DIALOGS",
    SET_CURRENT_DIALOG_BY_ID = "SET_CURRENT_DIALOG_BY_ID",
    SET_IS_LOADING_DIALOG = "SET_IS_LOADING_DIALOG",
    FETCH_DIALOG_REMOVE = "FETCH_DIALOG_REMOVE"
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

export interface SetIsLoadingDialogAction {
    type: DialogActionTypes.SET_IS_LOADING_DIALOG,
    payload: boolean
}

export interface SetCurrentDialogById {
    type: DialogActionTypes.SET_CURRENT_DIALOG_BY_ID,
    payload: string
}

export interface fetchRemove {
    type: DialogActionTypes.FETCH_DIALOG_REMOVE,
    payload: string
}

export type DialogActions = fetchDialogs | fetchRemove | SetIsLoadingDialogAction | SetCurrentDialogById