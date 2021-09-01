import {Color} from "@material-ui/lab";

export enum AlertTypes {
    SET_ALERT = "SET_ALERT",
    CLOSE_ALERT = "CLOSE_ALERT"
}

export const ALERT_FILE_LIMIT_EXCEEDED = "Не более 5 файлов"

export interface AlertState {
    open: boolean
    severity: Color,
    text: string
}

export type SetAlertPayload = Omit<AlertState, "open">

export interface SetAlert {
    type: AlertTypes.SET_ALERT,
    payload: SetAlertPayload
}

export interface CloseAlert {
    type: AlertTypes.CLOSE_ALERT
}

export type AlertActions = SetAlert | CloseAlert