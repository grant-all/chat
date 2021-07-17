export interface IUser {
    _id: string,
    email: string,
    name: string,
    isActivated: boolean,
    avatar: string,
    accessToken?: string,

}