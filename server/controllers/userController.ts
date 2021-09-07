import express from "express";
import {validationResult} from "express-validator";

import userService from "../service/userService";
import ApiError from "../exceptions/apiError";
import {Server} from "socket.io";
import {IUser} from "../models/userModel";

class UserController {
    io: Server;

    constructor(io: Server) {
        this.io = io
    }

    async searchNewUsers(req: express.Request, res: express.Response, next): Promise<void> {
        try {
            const filters: string = req.query.name as string
            const foundUsers = await userService.searchNewUser(req.user._id, filters)
            res.json(foundUsers)

        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async update(req: express.Request, res: express.Response, next): Promise<void> {
        try {
            const data: {name?: string, avatar?: string} = req.body
            const userUpdate: IUser = await userService.update(req.user._id, data)
            res.json(userUpdate)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async registration(req: express.Request, res: express.Response, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty())
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))

            const {name, email, password} = req.body

            const user = await userService.registration(name, email, password)
            res.cookie("refreshToken", user.refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
            res.json(user)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async login(req: express.Request, res: express.Response, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: express.Request, res: express.Response, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie("refreshToken")
            res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req: express.Request, res: express.Response, next) {
        try {
            const {link} = req.params
            await userService.activate(link)
            res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }

    }

    async refresh(req: express.Request, res: express.Response, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", refreshToken, {maxAge: 1000* 60 * 60 * 24 * 30, httpOnly: true})
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default UserController