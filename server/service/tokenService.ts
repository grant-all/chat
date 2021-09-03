import jwt from 'jsonwebtoken'
import tokenModel from "../models/tokenModel";
import {IUser} from "../models/userModel";
import UserDto from "../dto/userDto";
import * as mongoose from "mongoose";

export interface IToken {
    accessToken: string,
    refreshToken: string
}

class TokenService {
    async generateTokens(payload: UserDto): Promise<IToken>{
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: 60 * 15})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: mongoose.Types.ObjectId, refreshToken: string) {
        const tokenData = await tokenModel.findOne({userId})

        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        return tokenModel.create({user: userId, refreshToken})
    }

    async removeToken(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as UserDto
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken: string) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }
}

export default new TokenService()