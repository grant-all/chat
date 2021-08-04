import {combineReducers} from "redux";
import {userReducer} from "./user";
import {dialogReducer} from "./dialog";
import {messageReducer} from "./message";
import appReducer from "./app";
import alertDialog from "./alertDialog";
import {socketReducer} from "./socket";

const rootReducer = combineReducers({
    user: userReducer,
    dialog: dialogReducer,
    message: messageReducer,
    app: appReducer,
    alertDialog: alertDialog,
    socket: socketReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer