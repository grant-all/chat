import {combineReducers} from "redux";
import userReducer from "./user";
import dialogReducer from "./dialog";
import messageReducer from "./message";
import appReducer from "./app";
import alertDialogReducer from "./alertDialog";
import socketReducer from "./socket";
import alertReducer from "./alert";

const rootReducer = combineReducers({
    user: userReducer,
    dialog: dialogReducer,
    message: messageReducer,
    app: appReducer,
    alert: alertReducer,
    alertDialog: alertDialogReducer,
    socket: socketReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer