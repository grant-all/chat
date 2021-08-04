import {SetSocketAction, SocketTypes} from "../types/socket";

export const setSocket = (payload: string): SetSocketAction => ({
    type: SocketTypes.SET_SOCKET,
    payload
})