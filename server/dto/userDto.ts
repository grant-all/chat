import {IUser} from "../models/userModel";

interface IUserDto{
    id: string,
    email: string;
    isActivated: boolean;
    avatar: string
}

export default class UserDto implements IUserDto{
    id;
    email;
    isActivated;
    avatar;

    constructor(model: IUser) {
        this.id = model._id
        this.email = model.email
        this.isActivated = model.isActivated
        this.avatar = model.avatar
    }
}