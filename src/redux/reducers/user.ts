import {UserActions, UserActionTypes, UserState} from "../types/user";
import {IUser} from "../../models/IUser";

const initialState : UserState = {
    user: {} as IUser,
    isAuth: false,
    loading: false
}

export const userReducer = (state = initialState, action: UserActions) : UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_REGISTRATION:
            return {user: action.payload, loading: false, isAuth: true}
        case UserActionTypes.FETCH_USER_LOGIN:
            return {user: action.payload, loading: false, isAuth: true}
        case UserActionTypes.FETCH_USER_LOGOUT:
            return {user: {} as IUser, loading: false, isAuth: false}
        case UserActionTypes.FETCH_USER_IS_AUTH:
            return {user: action.payload, loading: false, isAuth: true}
        default:
            return state
    }
}