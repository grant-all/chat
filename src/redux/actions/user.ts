import {Dispatch} from "redux";

import {UserActions, UserActionTypes} from "../types/user";
import {RegistrationRequest} from "../../models/request/RegistrationRequest";
import {LoginRequest} from "../../models/request/LoginRequest";
import {AppThunk} from "../store";
import userAPI from '../../api/user'

export const fetchRegistrationUser = (user: RegistrationRequest): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: true})
            const response = await userAPI.registration(user);
            localStorage.setItem("accessToken", response.data.accessToken);
            dispatch({type: UserActionTypes.FETCH_USER_REGISTRATION, payload: response.data.user})
        } catch (e) {
            console.log(e)
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: false})
        }
    }
}

export const fetchLoginUser = (user: LoginRequest): AppThunk => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: true})
            const response = await userAPI.login(user)
            localStorage.setItem("accessToken", response.data.accessToken);
            dispatch({type: UserActionTypes.FETCH_USER_LOGIN, payload: response.data.user})
            console.log(response)
            return response
        } catch (e) {
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: false})
        }
    }
}

export const fetchLogoutUser = (): AppThunk<void> => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: true})
            await userAPI.logout()
            localStorage.removeItem("accessToken");
            dispatch({type: UserActionTypes.FETCH_USER_LOGOUT})
        } catch (e) {
            console.log(e)
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: false})
        }
    }
}

export const fetchCheckAuthUser = (): AppThunk<void> => {
    return async (dispatch) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: true})
            const response = await userAPI.checkAuthUser()
            localStorage.setItem("accessToken", response.data.accessToken);
            dispatch({type: UserActionTypes.FETCH_USER_LOGIN, payload: response.data.user})
        } catch (e) {
            dispatch({type: UserActionTypes.FETCH_USER_LOADING, payload: false})
        }
    }
}

