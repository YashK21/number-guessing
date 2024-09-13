import { Router } from "express";

const userRouter = Router()
userRouter.route("/login").post()
userRouter.route("/signup").post()
export {userRouter }