import "express"
import {IUser} from "./models/userModel";

declare module "express" {
    interface Request {
        user: IUser
    }
}