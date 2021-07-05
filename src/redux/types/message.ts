import {IMessage} from "../../models/IMessage";

export enum MessageActionTypes {
    SET_IS_LOADING_MESSAGE = "SET_IS_LOADING_MESSAGE",
    FETCH_REMOVE_MESSAGE = "FETCH_REMOVE_MESSAGE",
    ADD_MESSAGE = "ADD_MESSAGE",
    FETCH_SEND_MESSAGE = "FETCH_SEND_MESSAGE",
    FETCH_MESSAGES = "FETCH_MESSAGES"
}

export interface MessageState {
    items: IMessage[],
    isLoading: boolean,
}

export interface SetIsLoadingMessageAction {
    type: MessageActionTypes.SET_IS_LOADING_MESSAGE,
    payload: boolean
}

export interface FetchRemoveMessageAction {
    type: MessageActionTypes.FETCH_REMOVE_MESSAGE,
    payload: string
}

export interface AddMessageAction {
    type: MessageActionTypes.ADD_MESSAGE,
    payload: IMessage
}

export interface FetchSendMessageAction {
    type: MessageActionTypes.FETCH_SEND_MESSAGE,
    payload: IMessage
}

export interface FetchMessagesAction {
    type: MessageActionTypes.FETCH_MESSAGES,
    payload: IMessage[]
}

export type MessageActions = SetIsLoadingMessageAction
    | FetchRemoveMessageAction
    | AddMessageAction
    | FetchSendMessageAction
    | FetchMessagesAction

