import express from "express";
import routerHome from "./home.js";
import routerLogin from "./login.js";
import routerSignUp from "./signUp.js";
import routerUploadImage from "./uploadImage.js";

const router = express.Router()

router.use("/home", routerHome)
router.use("/login",routerLogin)
router.use("/signUp",routerSignUp)
router.use("/uploadImage",routerUploadImage)
export default router;