import {AppAction, AppActionTypes, AppState} from "../types/app";

const initialState: AppState = {
    initialized: false
}

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case AppActionTypes.INITIALIZED_SUCCESS:
            return {...state, initialized: true}

        default:
            return state
    }
}

export default appReducer