import {IUser} from "../../models/IUser";
import {DialogActionTypes} from "./dialog";
import {UpdateUserRequest} from "../../models/request/UpdateUserRequest";

export enum UserActionTypes {
    SET_IS_LOADING_USER = "SET_IS_LOADING_USER",
    SET_IS_ONLINE_USER = "SET_IS_LOADING_USER",
    FETCH_USER_REGISTRATION = "FETCH_USERS_REGISTRATION",
    FETCH_USER_LOGIN = "FETCH_USERS_LOGIN",
    FETCH_USER_LOGOUT = "FETCH_USER_LOGOUT",
    FETCH_USER_IS_AUTH = "FETCH_USER_IS_AUTH",
    FETCH_USER_UPDATE = "FETCH_USER_UPDATE"

}

export interface UserState {
    user: IUser,
    isAuth: boolean
    loading: boolean,
}

export interface SetIsLoadingUserAction {
    type: UserActionTypes.SET_IS_LOADING_USER,
    payload: boolean
}

export interface FetchIsAuthAction {
    type: UserActionTypes.FETCH_USER_IS_AUTH,
    payload: IUser
}

export interface FetchUserRegistrationAction {
    type: UserActionTypes.FETCH_USER_REGISTRATION,
    payload: IUser
}

export interface FetchUserLoginAction {
    type: UserActionTypes.FETCH_USER_LOGIN,
    payload: IUser
}

export interface FetchUserLogoutAction {
    type: UserActionTypes.FETCH_USER_LOGOUT,
}

export interface FetchUserUpdate {
    type:UserActionTypes.FETCH_USER_UPDATE,
    payload: IUser
}

export type UserActions = FetchUserLogoutAction
    | FetchIsAuthAction
    | FetchUserLoginAction
    | SetIsLoadingUserAction
    | FetchUserRegistrationAction
    | FetchUserUpdate;