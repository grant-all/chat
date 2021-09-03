import "express"
import "socket.io-client"
import {IUser} from "./models/userModel";
import UserDto from "./dto/userDto";

declare module "express" {
    interface Request {
        user: UserDto
    }
}
