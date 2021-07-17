import {MessageActions, MessageActionTypes, MessageState} from "../types/message";

const initialState: MessageState = {
    items: [],
    isLoading: false
}

export const messageReducer = (state = initialState, action: MessageActions): MessageState => {
    switch (action.type) {
        case MessageActionTypes.FETCH_MESSAGES:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }

        case MessageActionTypes.ADD_MESSAGE: {
            return {
                ...state,
                items: [...state.items, action.payload],
                isLoading: false
            }
        }

        case MessageActionTypes.FETCH_DELETE_MESSAGE: {
            return {
                items: state.items.filter(messageObj => messageObj._id !== action.payload),
                isLoading: false
            }
        }

        case MessageActionTypes.SET_READED_STATUS_LAST_MESSAGES: {
            return {
                ...state,
                items: state.items.map(messageObj => {
                    if(messageObj.dialog._id === action.payload)
                        messageObj.read = true

                    return messageObj
                })
            }
        }

        default:
            return state
    }
}