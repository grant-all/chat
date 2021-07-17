import {Server} from 'socket.io'
import express from "express";
import createUserRouter from "./userRouter";
import createDialogRouter from "./dialogRouter";
import createMessageRouter from "./messageRouter";
import fileRouter from "./fileRouter";

const createRoutes = (app: express.Express, io: Server): void => {
    app.use("/users", createUserRouter(io))
    app.use("/dialogs", createDialogRouter(io))
    app.use("/files", fileRouter)
    app.use("/messages", createMessageRouter(io))
}

export default createRoutes

