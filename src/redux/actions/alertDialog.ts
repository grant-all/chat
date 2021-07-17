import {
    AlertDialogTypes,
    CloseAlertDialog,
    SetAlertDialog,
    SetAlertDialogPayload,
} from "../types/alertDialog";

export const setAlertDialog = (payload: SetAlertDialogPayload): SetAlertDialog => ({
    type: AlertDialogTypes.SET_ALERT_DIALOG,
    payload
})

export const closeAlertDialog = (): CloseAlertDialog => ({
    type: AlertDialogTypes.CLOSE_ALERT_DIALOG
})