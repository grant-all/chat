import UserModel, {IUser} from '../models/userModel'
import bcrypt from 'bcrypt'
import {v4} from 'uuid'

import MailService from './mailService'
import tokenService from "../service/tokenService";
import UserDto from "../dto/userDto";
import userModel from "../models/userModel";
import ApiError from "../exceptions/apiError";
import tokenModel from "../models/tokenModel";

class UserService {
    async registration(name: string, email: string, password: string) {
        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw new Error("Пользователь с такми email уже есть")
        }

        const activationLink = v4()
        const hashPassword = await bcrypt.hash(password, 3)

        const user = await UserModel.create({name, email, password: hashPassword, activationLink});
        await MailService.sendActivationMail(email, `${process.env.API_URL}/users/activation/` + activationLink)

        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink: string) {
        const user: IUser = await userModel.findOne({activationLink})

        if(!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации")
        }

        user.isActivated = true
        await user.save()
    }

    async login(email: string, password: string) {
        const user: IUser = await userModel.findOne({email})

        if(!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if(!isPassEqual) {
            throw ApiError.BadRequest("Неверный пароль")
        }

        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken: string) {
        return tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthoraizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        console.log(tokenFromDb)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthoraizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

export default new UserService()