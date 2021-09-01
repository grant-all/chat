import UserModel, {IUser} from '../models/userModel'
import bcrypt from 'bcrypt'
import {v4} from 'uuid'

import MailService from './mailService'
import tokenService from "../service/tokenService";
import UserDto from "../dto/userDto";
import userModel from "../models/userModel";
import ApiError from "../exceptions/apiError";
import dialogModel from "../models/dialogModel";


class UserService {
    async searchNewUser(filter: string): Promise<IUser[]> {
        const regex = new RegExp(`^${filter}.*`)

        // return userModel.aggregate([
        //     {
        //         $lookup: {
        //             from: "dialog",
        //             localField: "_id",
        //             foreignField: "",
        //             as: "join"
        //         }
        //     },
        //     {
        //         $match: {
        //             "join": {
        //                 $size: 0
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             join: 0
        //         }
        //     }
        // ])

        return dialogModel.aggregate([{
            $lookup: {
                from: "users",
                let: {id: "$_id", author: "$author", partner: "$partner"},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {$not: {$in: ['$_id', ["$$author", "$$partner"]]}},
                                    {
                                        $or: [{
                                            $regexFind: {
                                                input: '$name',
                                                regex
                                            }
                                        }, {$regexFind: {input: {$toString: '$_id'}, regex}}]
                                    }
                                ]
                                // // $and: [
                                // //     {$eq: ["$_id", "$$partner"]},
                                // //     {$regexFind: {input: '$name', regex}}
                                // // ]
                                // $and: [
                                //     {$eq: ["$_id", "$$author"]},
                                //     {$regexFind: {input: '$name', regex}},
                                // ]
                            }
                        }
                    }
                ],
                as: "match"
            },
        }]) //find({$or: [{name: regex}, {_id: regex}]}).limit(10)
    }

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
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink: string) {
        const user: IUser = await userModel.findOne({activationLink})

        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации")
        }

        user.isActivated = true
        await user.save()
    }

    async login(email: string, password: string) {
        const user: IUser = await userModel.findOne({email})

        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if (!isPassEqual) {
            throw ApiError.BadRequest("Неверный пароль")
        }

        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto._id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken: string) {
        return tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthoraizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthoraizedError()
        }

        const user = await UserModel.findById(userData._id)
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

export default new UserService()