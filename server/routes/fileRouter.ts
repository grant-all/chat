import express from "express";
import multer from "multer"
import fileController from "../controllers/fileController";

const storage = multer.memoryStorage()
const uploader = multer({storage})
const fileRouter = express.Router()

fileRouter.post("/create", uploader.single("file") , fileController.create)

export default fileRouter
