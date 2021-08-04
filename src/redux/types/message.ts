import {IMessage} from "../../models/IMessage";
import {SetCurrentDialogAction} from "./dialog";

export enum MessageActionTypes {
    SET_IS_LOADING_MESSAGE = "SET_IS_LOADING_MESSAGE",
    FETCH_DELETE_MESSAGE = "FETCH_DELETE_MESSAGE",
    ADD_MESSAGE = "ADD_MESSAGE",
    FETCH_MESSAGES = "FETCH_MESSAGES",
    SET_READED_STATUS_LAST_MESSAGES = "SET_READED_STATUS_LAST_MESSAGES",
}

export interface MessageState {
    items: IMessage[],
    isLoading: boolean,
}

export interface SetIsLoadingMessageAction {
    type: MessageActionTypes.SET_IS_LOADING_MESSAGE,
    payload: boolean
}

export interface FetchDeleteMessageAction {
    type: MessageActionTypes.FETCH_DELETE_MESSAGE,
    payload: string
}

export interface AddMessageAction {
    type: MessageActionTypes.ADD_MESSAGE,
    payload: IMessage
}

export interface FetchMessagesAction {
    type: MessageActionTypes.FETCH_MESSAGES,
    payload: IMessage[]
}

export interface SetReadedStatusLastMessagesAction {
    type: MessageActionTypes.SET_READED_STATUS_LAST_MESSAGES,
    payload: string
}


export type MessageActions = SetIsLoadingMessageAction
    | FetchDeleteMessageAction
    | AddMessageAction
    | FetchMessagesAction
    | SetReadedStatusLastMessagesAction
