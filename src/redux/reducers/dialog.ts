import {DialogActions, DialogActionTypes, DialogState} from "../types/dialog";

const initialState : DialogState = {
    items: [],
    currentDialogId: window.location.pathname.split("dialog/")[1],
    isLoading: false,
}

export const dialogReducer = (state = initialState, action: DialogActions): DialogState => {
    switch (action.type) {
        case DialogActionTypes.FETCH_DIALOGS:
            return {...state, items: action.payload, isLoading: false}

        case DialogActionTypes.FETCH_DIALOG_REMOVE:
            const newItems = state.items.filter(dialogObj => dialogObj._id !== action.payload)
            return {...state, items: newItems, isLoading: false}

        case DialogActionTypes.SET_IS_LOADING_DIALOG:
            return {...state, isLoading: action.payload}

        case DialogActionTypes.SET_CURRENT_DIALOG_BY_ID:
            return {...state, currentDialogId: action.payload, isLoading: true}

        default:
            return state
    }
}