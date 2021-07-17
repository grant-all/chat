import express, {Router} from 'express'
import dialogController from '../controllers/dialogController'
import authMiddleware from "../middlewares/authMiddleware";
import {Server} from "socket.io";
import DialogController from "../controllers/dialogController";

function createDialogRouter(io: Server): Router {
    const dialogRouter: Router = express.Router()
    const dialogController: DialogController = new DialogController(io)

    dialogRouter.get("/", authMiddleware, dialogController.getDialogs)
    dialogRouter.post("/create", authMiddleware, dialogController.create)
    dialogRouter.delete("/:id", authMiddleware, dialogController.delete)

    return dialogRouter
}


export default createDialogRouter