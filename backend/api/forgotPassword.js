import express from "express";
import { forgotPassword, forgotPasswordChangePassword, forgotPasswordCheck } from "../controllers/forgotPassword.js";

const routerForgotPassword = express.Router()
routerForgotPassword.post("/",forgotPassword)
routerForgotPassword.post("/check",forgotPasswordCheck)
routerForgotPassword.post("/changePassword",forgotPasswordChangePassword)
export default routerForgotPassword;