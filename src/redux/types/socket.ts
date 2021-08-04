import {Socket} from "socket.io-client";

export enum SocketTypes {
    SET_SOCKET = "SET_SOCKET"
}

export interface SocketState {
    socket: Socket | null
}

export interface SetSocketAction {
    type: SocketTypes.SET_SOCKET,
    payload: string
}

export type SocketActions = SetSocketAction