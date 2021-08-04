import "express"
import "socket.io-client"
import {IUser} from "./models/userModel";

declare module "express" {
    interface Request {
        user: IUser
    }
}
