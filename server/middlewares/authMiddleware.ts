import express from "express";
import ApiError from "../exceptions/apiError";
import tokenService from "../service/tokenService";

export default function (req: express.Request, res: express.Response, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader)
            return next(ApiError.UnauthoraizedError())

        const accessToken = authorizationHeader.split(" ")[1]

        if(!accessToken)
            return next(ApiError.UnauthoraizedError())

        const userData = tokenService.validateAccessToken(accessToken)

        if(!userData)
            return next(ApiError.UnauthoraizedError())

        next()
    } catch (e) {
        return next(ApiError.UnauthoraizedError())
    }
}