import {Schema, model} from 'mongoose'

interface IToken {
    user: string
    refreshToken: string
}

const TokenSchema = new Schema<IToken>({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String, required: true}
})

export default model<IToken>("Token", TokenSchema)