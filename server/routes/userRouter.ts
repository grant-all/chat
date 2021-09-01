import express, {Router} from 'express'
import {body} from "express-validator";
import UserController from '../controllers/userController'
import {Server} from "socket.io";
import authMiddleware from "../middlewares/authMiddleware";

function createUserRouter(io: Server): Router {
    const userRouter: Router = express.Router()
    const userController: UserController = new UserController(io)

    userRouter.get(
        "/searchNewUser",
        authMiddleware,
        userController.searchNewUser
    )
    userRouter.post(
        "/registration",
        body("email").isEmail(),
        body("password").isLength({min: 5, max: 32}),
        userController.registration)
    userRouter.post("/login", userController.login)
    userRouter.get("/activation/:link", userController.activate)
    userRouter.get("/logout", userController.logout)
    userRouter.get("/refresh", userController.refresh)

    return userRouter
}


export default createUserRouter