import {createStore, applyMiddleware, AnyAction} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

import rootReducer, {RootState} from "./reducers";

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store