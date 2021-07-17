export enum AlertDialogTypes {
    SET_ALERT_DIALOG = "SET_ALERT_DIALOG",
    CLOSE_ALERT_DIALOG = "CLOSE_ALERT_DIALOG"
}

export const ALERT_DIALOG_DELETE_MESSAGE = "Удалить это сообщение?"
export const ALERT_DIALOG_DELETE_DIALOG = "Удалить этот дилог?"

export interface AlertDialogState {
    open: boolean,
    title: string,
    text: string,
    handleAgree: ((...args:any[]) => void) | null;
    data?: any
}

export type SetAlertDialogPayload = Omit<AlertDialogState, "open">

export interface SetAlertDialog {
    type: AlertDialogTypes.SET_ALERT_DIALOG,
    payload: SetAlertDialogPayload
}

export interface CloseAlertDialog {
    type: AlertDialogTypes.CLOSE_ALERT_DIALOG
}

export type AlertDialogActions = SetAlertDialog | CloseAlertDialog

