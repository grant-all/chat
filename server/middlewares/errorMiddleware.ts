import express from "express";

import ApiError from "../exceptions/apiError";

export default function (err: ApiError|Error, req: express.Request, res: express.Response, next) {
    if(err instanceof ApiError) {
        console.log(err)
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    console.log(err)
    return res.status(500).json({message: "Непредвиденная ошибка"})
}