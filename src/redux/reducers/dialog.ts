import {DialogActions, DialogActionTypes, DialogState} from "../types/dialog";
import {MessageActions, MessageActionTypes} from "../types/message";

const initialState : DialogState = {
    items: [],
    currentDialogId: window.location.pathname.split("dialogs/")[1],
    isLoading: false,
}

export const dialogReducer = (state = initialState, action: DialogActions | MessageActions): DialogState => {
    switch (action.type) {
        case DialogActionTypes.FETCH_DIALOGS:
            return {...state, items: action.payload, isLoading: false}

        case MessageActionTypes.ADD_MESSAGE:
            return {
                ...state,
                items: state.items.map((dialogObj) => {
                    console.log(action.payload)
                    if(dialogObj._id === action.payload.dialog._id)
                        dialogObj.lastMessage = action.payload

                    return dialogObj
                })
            }

        case DialogActionTypes.CREATE_DIALOG:
            return {
                ...state,
                items: [...state.items, action.payload],
                isLoading: false
            }

        case DialogActionTypes.FETCH_DIALOG_REMOVE:
            const newItems = state.items.filter(dialogObj => dialogObj._id !== action.payload)
            return {...state, items: newItems, isLoading: false}

        case DialogActionTypes.SET_IS_LOADING_DIALOG:
            return {...state, isLoading: action.payload}

        case DialogActionTypes.SET_CURRENT_DIALOG:
            return {...state, currentDialogId: action.payload, isLoading: false}

        case DialogActionTypes.SET_READED_STATUS_LAST_MESSAGE:
            return {
                ...state,
                items: state.items.map((dialogObj) => {
                    if(dialogObj._id === action.payload && dialogObj.lastMessage !== null)
                        dialogObj.lastMessage.read = true

                    return dialogObj
                })
            }

        case DialogActionTypes.DELETE_MESSAGE:
            return {
                ...state,
                items: state.items.map(dialogObj => {
                    if(dialogObj._id === action.payload.dialogId)
                        dialogObj.lastMessage = action.payload.message

                    return dialogObj
                })
            }



        case DialogActionTypes.SET_IS_ONLINE:
            return {
                ...state,
                items: state.items.map(dialogObj => {
                    if(dialogObj.author._id === action.payload.userId)
                        dialogObj.author.isOnline = action.payload.isOnline
                    else if(dialogObj.partner._id === action.payload.userId)
                        dialogObj.partner.isOnline = action.payload.isOnline

                    return dialogObj
                })
            }

        default:
            return state
    }
}

export default dialogReducer