export enum AppActionTypes {
    INITIALIZED_SUCCESS= "INITIALIZED_SUCCESS"
}

export interface AppState {
    initialized: boolean
}

export interface InitializedSuccess {
    type: AppActionTypes.INITIALIZED_SUCCESS
}

export type AppAction = InitializedSuccess
