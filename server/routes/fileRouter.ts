import express from "express";
import multer from "multer"
import fileController from "../controllers/fileController";
import authMiddleware from "../middlewares/authMiddleware";

//const storage = multer.memoryStorage()
//const uploader = multer({storage})
const fileRouter = express.Router()

fileRouter.post("/", authMiddleware , fileController.create)

export default fileRouter
