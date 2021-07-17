import {IUser} from "../models/userModel";

interface IUserDto{
    _id: string,
    email: string;
    isActivated: boolean;
    avatar: string
}

export default class UserDto implements IUserDto{
    _id;
    email;
    isActivated;
    avatar;

    constructor(model: IUser) {
        this._id = model._id
        this.email = model.email
        this.isActivated = model.isActivated
        this.avatar = model.avatar
    }
}