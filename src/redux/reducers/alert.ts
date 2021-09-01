import {AlertActions, AlertState, AlertTypes} from "../types/alert";

const initialState: AlertState = {
    open: false,
    severity: "info",
    text: ""
}

const alertReducer = (state = initialState, action: AlertActions) => {
    switch (action.type) {
        case AlertTypes.SET_ALERT:
            return {
                ...state,
                open: true,
                severity: action.payload.severity,
                text: action.payload.text
            }

        case AlertTypes.CLOSE_ALERT:
            return {
                ...state,
                open: false
            }

        default:
            return state
    }
}

export default alertReducer