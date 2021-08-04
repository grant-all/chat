import {SocketActions, SocketState, SocketTypes} from "../types/socket";
import {io} from "socket.io-client";

const initialState: SocketState = {
    socket: null
}

export const socketReducer = (state = initialState, action: SocketActions): SocketState => {
    switch (action.type) {
        case SocketTypes.SET_SOCKET:
            return {...state, socket: io({query: {userId: action.payload}})}
        default:
            return state
    }
}