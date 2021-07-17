import {AppThunk} from "../store";
import {AppAction} from "../types/app";
import {fetchCheckAuthUser} from "./user";
import {AppActionTypes} from "../types/app"
import {UserActions} from "../types/user";

export const initializeApp = (): AppThunk<AppAction | UserActions> =>
    async (dispatch) => {
        if(localStorage.getItem("accessToken"))
            await dispatch(fetchCheckAuthUser())
        dispatch(initializeSuccess())
    }

const initializeSuccess = () => ({type: AppActionTypes.INITIALIZED_SUCCESS})