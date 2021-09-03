import {AppThunk} from "../store";
import {
    DialogActions,
    DialogActionTypes,
    SetIsLoadingDialogAction,
    SetReadedStatusLastMessageAction,
    DeleteMessageAction, SetIsOnlineDialogAction
} from "../types/dialog";
import dialogAPI from '../../utils/api/dialogs'
import {IMessage} from "../../models/IMessage";
import {Socket} from "socket.io-client";
import {IUser} from "../../models/IUser";
import {IDialog} from "../../models/IDialog";
import {AxiosResponse} from "axios";

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


export const fetchDeleteDialog = (dialogId: string): AppThunk<DialogActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingDialog(true))
            await dialogAPI.removeDialog(dialogId)
            dispatch({type: DialogActionTypes.FETCH_DELETE_DIALOG, payload: dialogId})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingDialog(false))
        }
    }
}

export const fetchCreateDialog = (partner: string, text: string): AppThunk<DialogActions> => {
    return async dispatch => {
        try {
            dispatch(setIsLoadingDialog(true))
            const dialog: AxiosResponse<IDialog> = await dialogAPI.createDialog(partner, text)
            dispatch({type: DialogActionTypes.CREATE_DIALOG, payload: dialog.data})
        }
        catch (e) {
            console.log(e)
            dispatch(setIsLoadingDialog(false))
        }
    }
}

export const setCurrentDialog = (payload: string) : AppThunk<DialogActions> => {
    return (dispatch, getState) => {
            const socket: Socket = getState().socket.socket!
            dispatch({type: DialogActionTypes.SET_CURRENT_DIALOG, payload})
            socket.emit("dialog:join", payload)
    }
}

export const setReadedStatusLastMessage = (payload: string): SetReadedStatusLastMessageAction => ({
    type: DialogActionTypes.SET_READED_STATUS_LAST_MESSAGE,
    payload
})

export const deleteMessage = (dialogId: string, message: IMessage): DeleteMessageAction => ({
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

export const setIsOnline = (userId: string, isOnline: boolean) : SetIsOnlineDialogAction => ({
    type: DialogActionTypes.SET_IS_ONLINE,
    payload: {
        userId,
        isOnline
    }
})