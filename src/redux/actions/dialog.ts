import {AppThunk} from "../store";
import {
    DialogActions,
    DialogActionTypes,
    SetCurrentDialog,
    SetIsLoadingDialogAction,
    SetReadedStatusLastMessage,
    DeleteMessage
} from "../types/dialog";
import dialogAPI from '../../utils/api/dialogs'
import {IMessage} from "../../models/IMessage";
import socket from "../../socket";

export const fetchDialogs = (): AppThunk<DialogActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingDialog(true))
            const response = await dialogAPI.getAll()
            dispatch({type: DialogActionTypes.FETCH_DIALOGS, payload: response.data!})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingDialog(false))
        }
    }
}


export const fetchRemove = (dialogId: string): AppThunk<DialogActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingDialog(true))
            await dialogAPI.removeDialog(dialogId)
            dispatch({type: DialogActionTypes.FETCH_DIALOG_REMOVE, payload: dialogId})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingDialog(false))
        }
    }
}

export const setCurrentDialog = (payload: string) : AppThunk<DialogActions> => {
    return dispatch => {
            dispatch({type: DialogActionTypes.SET_CURRENT_DIALOG, payload})
            socket.emit("dialog:join", payload)
    }
}

export const setReadedStatusLastMessage = (payload: string): SetReadedStatusLastMessage => ({
    type: DialogActionTypes.SET_READED_STATUS_LAST_MESSAGE,
    payload
})

export const deleteMessage = (dialogId: string, message: IMessage): DeleteMessage => ({
    type: DialogActionTypes.DELETE_MESSAGE,
    payload: {
        dialogId,
        message
    }
})

export const setIsLoadingDialog = (payload: boolean) : SetIsLoadingDialogAction => ({
    type: DialogActionTypes.SET_IS_LOADING_DIALOG,
    payload
})