import {AppThunk} from "../store";
import {
    MessageActions,
    MessageActionTypes,
    SetIsLoadingMessageAction,
    SetReadedStatusLastMessagesAction
} from "../types/message";
import messagesAPI from '../../utils/api/messaages'
import {IMessage} from "../../models/IMessage";
import {deleteMessage} from "./dialog";
import {DialogActions, DialogActionTypes} from "../types/dialog";

export const fetchMessages = (): AppThunk<MessageActions> => {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsLoadingMessage(true))
            const response = await messagesAPI.getAll(getState().dialog.currentDialogId)
            dispatch({type: MessageActionTypes.FETCH_MESSAGES, payload: response.data})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingMessage(false))
        }
    }
}

export const fetchDeleteMessage = (messageId: string): AppThunk<MessageActions | DialogActions> => {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsLoadingMessage(true))
            const dialogId: string = (await messagesAPI.delete(messageId)).data.dialog._id
            dispatch({type: MessageActionTypes.FETCH_DELETE_MESSAGE, payload: messageId})
            const messages: IMessage[] = getState().message.items
            const message: IMessage | undefined = messages[messages.length - 1]
            dispatch(deleteMessage(dialogId, message))
        } catch (e) {
            console.log(e)
            setIsLoadingMessage(false)
        }
    }
}

export const fetchSendMessage = (text: string, attachments?: string[]): AppThunk<MessageActions | DialogActions> => {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsLoadingMessage(true))
            const message = await messagesAPI.send(text, getState().dialog.currentDialogId, attachments)
            dispatch(addMessage(message.data))
        } catch (e) {
            console.log(e)
            setIsLoadingMessage(false)
        }
    }
}

export const addMessage = (message: IMessage): AppThunk<MessageActions> => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: MessageActionTypes.ADD_MESSAGE, payload: message})
        } catch (e) {
            console.log(e)
        }
    }
}

export const setIsLoadingMessage = (payload: boolean): SetIsLoadingMessageAction => ({
    type: MessageActionTypes.SET_IS_LOADING_MESSAGE,
    payload
})

export const setReadedStatusLastMessages = (payload: string): SetReadedStatusLastMessagesAction => ({
    type: MessageActionTypes.SET_READED_STATUS_LAST_MESSAGES,
    payload
})