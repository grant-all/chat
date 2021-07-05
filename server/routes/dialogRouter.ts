import express from 'express'
import dialogController from '../controllers/dialogController'
import authMiddleware from "../middlewares/authMiddleware";

const dialogRouter = express.Router()

dialogRouter.get("/", authMiddleware, dialogController.getDialogs)
dialogRouter.post("/create", authMiddleware, dialogController.create)
dialogRouter.delete("/:id", authMiddleware, dialogController.delete)

export default dialogRouter