import {AlertDialogActions, AlertDialogState, AlertDialogTypes} from "../types/alertDialog";

const initialState: AlertDialogState = {
    open: false,
    title: "",
    text: "",
    handleAgree: null,
    data: null
}

const alertDialogReducer = (state = initialState, action: AlertDialogActions): AlertDialogState => {
    switch (action.type) {
        case AlertDialogTypes.SET_ALERT_DIALOG:
            return {...state, open: true, ...action.payload}

        case AlertDialogTypes.CLOSE_ALERT_DIALOG:
            return initialState

        default:
            return state
    }
};

export default alertDialogReducer