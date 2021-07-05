import {Dispatch} from "redux";

import {SetIsLoadingUserAction, UserActions, UserActionTypes} from "../types/user";
import {RegistrationRequest} from "../../models/request/RegistrationRequest";
import {LoginRequest} from "../../models/request/LoginRequest";
import {AppThunk} from "../store";
import userAPI from '../../api/user'
import {DialogActionTypes, SetIsLoadingDialogAction} from "../types/dialog";
import {setIsLoadingDialog} from "./dialog";

export const fetchRegistrationUser = (user: RegistrationRequest): AppThunk<UserActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingUser(true))
            const response = await userAPI.registration(user);
            localStorage.setItem("accessToken", response.data.accessToken);
            dispatch({type: UserActionTypes.FETCH_USER_REGISTRATION, payload: response.data.user})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingUser(false))
        }
    }
}

export const fetchLoginUser = (user: LoginRequest): AppThunk<UserActions> => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(setIsLoadingUser(true))
            const response = await userAPI.login(user)
            localStorage.setItem("accessToken", response.data.accessToken);
            dispatch({type: UserActionTypes.FETCH_USER_LOGIN, payload: response.data.user})
            return response
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingUser(false))
        }
    }
}

export const fetchLogoutUser = (): AppThunk<UserActions> => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(setIsLoadingUser(true))
            await userAPI.logout()
            localStorage.removeItem("accessToken");
            dispatch({type: UserActionTypes.FETCH_USER_LOGOUT})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingUser(false))
        }
    }
}

export const fetchCheckAuthUser = (): AppThunk<UserActions> => {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingUser(true))
            const response = await userAPI.checkAuthUser()
            localStorage.setItem("accessToken", response.data.accessToken);
            dispatch({type: UserActionTypes.FETCH_USER_LOGIN, payload: response.data.user})
        } catch (e) {
            console.log(e)
            dispatch(setIsLoadingUser(false))
        }
    }
}

export const setIsLoadingUser = (payload: boolean): SetIsLoadingUserAction => ({
    type: UserActionTypes.SET_IS_LOADING_USER,
    payload
})

