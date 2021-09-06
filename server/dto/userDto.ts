import {IUser} from "../models/userModel";
import * as mongoose from "mongoose";

interface IUserDto{
    _id: string,
    name: string,
    email: string;
    isActivated: boolean;
    avatar: string
}

export default class UserDto implements IUserDto{
    _id;
    name;
    email;
    isActivated;
    avatar;

    constructor(model: IUser & mongoose.Document) {
        this._id = model._id
        this.name = model.name
        this.email = model.email
        this.isActivated = model.isActivated
        this.avatar = model.avatar
    }
}