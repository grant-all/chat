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
export type AppThunk<Action extends AnyAction, ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

export default store