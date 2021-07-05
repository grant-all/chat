import {AppThunk} from "../store";
import {DialogActions, DialogActionTypes, SetCurrentDialogById, SetIsLoadingDialogAction} from "../types/dialog";
import dialogAPI from '../../api/dialogs'

export const fetchDialogs = (): AppThunk<DialogActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingDialog(true))
            const response = await dialogAPI.getAll()
            console.log(response.data)
            dispatch({type: DialogActionTypes.FETCH_DIALOGS, payload: response.data})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingDialog(false))
        }
    }
}

export const fetchRemove = (dialogId: string): AppThunk<DialogActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingDialog(true))
            await dialogAPI.removeDialog(dialogId)
            dispatch({type: DialogActionTypes.FETCH_DIALOG_REMOVE, payload: dialogId})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingDialog(false))
        }
    }
}

export const setCurrentDialogById = (dialogId: string) : SetCurrentDialogById => ({
    type: DialogActionTypes.SET_CURRENT_DIALOG_BY_ID,
    payload: dialogId
})

export const setIsLoadingDialog = (payload: boolean) : SetIsLoadingDialogAction => ({
    type: DialogActionTypes.SET_IS_LOADING_DIALOG,
    payload
})