import {AppThunk} from "../store";
import {MessageActions, MessageActionTypes, SetIsLoadingMessageAction} from "../types/message";
import messagesAPI from '../../api/messaages'
import {IMessage} from "../../models/IMessage";

export const fetchMessages = (dialogId: string): AppThunk<MessageActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingMessage(true))
            const response = await messagesAPI.getAll(dialogId)
            dispatch({type: MessageActionTypes.FETCH_MESSAGES, payload: response.data})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingMessage(false))
        }
    }
}

export const fetchRemoveMessage = (messageId: string): AppThunk<MessageActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingMessage(true))
            await messagesAPI.remove(messageId)
            dispatch({type: MessageActionTypes.FETCH_REMOVE_MESSAGE, payload: messageId})
        } catch (e) {
            console.log(e)
            setIsLoadingMessage(false)
        }
    }
}

export const fetchSendMessage = (text: string, dialogId: string, attachments: any): AppThunk<MessageActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingMessage(true))
            const message = await messagesAPI.send(text, dialogId, attachments)
            dispatch({type: MessageActionTypes.FETCH_SEND_MESSAGE, payload: message.data})
        } catch (e) {
            console.log(e)
            setIsLoadingMessage(false)
        }
    }
}

export const addMessage = (message: IMessage):AppThunk<MessageActions> => {
    return async (dispatch, getState) => {
        try {
            const { dialog } = getState()
            dispatch(setIsLoadingMessage(true))
            if(message.dialog._id === dialog.currentDialogId)
                dispatch({type: MessageActionTypes.ADD_MESSAGE, payload: message})
        } catch (e) {
            console.log(e)
            setIsLoadingMessage(true)
        }
    }
}

export const setIsLoadingMessage = (payload: boolean): SetIsLoadingMessageAction => ({
    type: MessageActionTypes.SET_IS_LOADING_MESSAGE,
    payload
})