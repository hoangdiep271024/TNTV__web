import express from "express";
import routerHome from "./home.js";
import routerLogin from "./login.js";
import routerSignUp from "./signUp.js";

const router = express.Router()

router.use("/home", routerHome)
router.use("/login",routerLogin)
router.use("/signUp",routerSignUp)
export default router;