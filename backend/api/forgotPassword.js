import express from "express";
import { forgotPassword, forgotPasswordCheck } from "../controllers/forgotPassword.js";

const routerForgotPassword = express.Router()
routerForgotPassword.post("/",forgotPassword)
routerForgotPassword.post("/check",forgotPasswordCheck)
export default routerForgotPassword;