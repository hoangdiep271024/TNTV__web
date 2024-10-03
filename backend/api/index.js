import express from "express";
import routerChatBot from "./chatBot.js";
import routerFilm from "./film.js";
import routerHome from "./home.js";
import routerLogin from "./login.js";
import routerQRPayment from "./QRPayment.js";
import routerSignUp from "./signUp.js";
import routerUploadImage from "./uploadImage.js";
import routerUserInfo from "./userInfo.js";

const router = express.Router()

router.use("/home", routerHome)
router.use("/login",routerLogin)
router.use("/signUp",routerSignUp)
router.use("/uploadImage",routerUploadImage)
router.use("/payment",routerQRPayment)
router.use("/film",routerFilm)
router.use("/chatBot",routerChatBot)
router.use("/userInfo",routerUserInfo)
export default router;