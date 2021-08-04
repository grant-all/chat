import {IUser} from "./userModel";
import mongoose, {Schema} from "mongoose";

export interface IOnlineUser {
    user: string | IUser,
    countTab: number
}

const OnlineUserScheme = new Schema<IOnlineUser>({
    user:{type: Schema.Types.ObjectId, ref: "User", require: true},
    countTab: {type: Number, default: 1, require: true}
})

export default mongoose.model<IOnlineUser>("OnlineUser", OnlineUserScheme)