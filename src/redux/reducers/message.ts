import {MessageActions, MessageActionTypes, MessageState} from "../types/message";

const initialState: MessageState = {
    items: [],
    isLoading: false
}

export const messageReducer = (state = initialState, action: MessageActions): MessageState => {
    switch (action.type) {
        case MessageActionTypes.FETCH_MESSAGES:
            return {items: action.payload, isLoading: false}
        case MessageActionTypes.ADD_MESSAGE: {
            const newItems = [...state.items, action.payload]
            return {items: newItems, isLoading: false}
        }
        case MessageActionTypes.FETCH_REMOVE_MESSAGE: {
            const newItems = state.items.filter(messageObj => messageObj._id !== action.payload)
            return {items: newItems, isLoading: false}
        }
        default:
            return state
    }
}