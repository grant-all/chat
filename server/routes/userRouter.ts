import express from 'express'
import {body} from "express-validator";
import userController from '../controllers/userController'
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = express.Router()

userRouter.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 5, max: 32}),
    userController.registration)
userRouter.post("/login", userController.login)
userRouter.get("/activation/:link", userController.activate)
userRouter.get("/logout", userController.logout)
userRouter.get("/refresh", userController.refresh)

export default userRouter