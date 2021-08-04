import mongoose from 'mongoose'

const {Schema, model} = mongoose

export interface IUser extends mongoose.Document {
    name: string,
    avatar: string,
    email: string,
    password: string,
    isActivated: boolean,
    activationLink: string,
    lastSeen: Date,
    isOnline: boolean;
}

const userScheme = new Schema<IUser>({
    name: {type: String, required: true},
    avatar: {type: String, default: ""},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    activationLink: String,
    isActivated: {type: Boolean, default: false},
    lastSeen: {type: Date, default: new Date()}
}, {timestamps: true})

userScheme.set('toJSON', {virtuals: true})

export default model<IUser>("User", userScheme)