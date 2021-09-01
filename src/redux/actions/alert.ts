import {AlertTypes, CloseAlert, SetAlertPayload} from "../types/alert";
import {SetAlert} from "../types/alert";

export const setAlert = (payload: SetAlertPayload): SetAlert=> ({
    type: AlertTypes.SET_ALERT,
    payload
})

export const closeAlert = (): CloseAlert => ({
    type: AlertTypes.CLOSE_ALERT
})

