import express from "express";
import ApiError from "../exceptions/apiError";
import tokenService from "../service/tokenService";
import {IUser} from "../models/userModel";

export default function (req: express.Request, res: express.Response, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader)
            return next(ApiError.UnauthoraizedError())

        const accessToken = authorizationHeader.split(" ")[1]

        if(!accessToken)
            return next(ApiError.UnauthoraizedError())


        const userData = tokenService.validateAccessToken(accessToken) as IUser

        if(!userData)
            return next(ApiError.UnauthoraizedError())

        req.user = userData;

        next()
    } catch (e) {
        return next(ApiError.UnauthoraizedError())
    }
}