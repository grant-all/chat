import {combineReducers} from "redux";
import {userReducer} from "./user";
import {dialogReducer} from "./dialog";
import {messageReducer} from "./message";

const rootReducer = combineReducers({
    user: userReducer,
    dialog: dialogReducer,
    message: messageReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer