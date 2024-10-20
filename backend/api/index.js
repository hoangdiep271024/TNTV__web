import express from "express";
import routerChatBot from "./chatBot.js";
import routerFilm from "./film.js";
import routerForgotPassword from "./forgotPassword.js";
import routerLichChieu from "./lichChieu.js";
import routerLogin from "./login.js";
import routerLogOut from "./logOut.js";
import routerQRPayment from "./QRPayment.js";
import routerSignUp from "./signUp.js";
import routerUploadImage from "./uploadImage.js";
import routerUserInfo from "./userInfo.js";

const router = express.Router()

router.use("/lichChieu", routerLichChieu)
router.use("/login",routerLogin)
router.use("/signUp",routerSignUp)
router.use("/uploadImage",routerUploadImage)
router.use("/payment",routerQRPayment)
router.use("/film",routerFilm)
router.use("/chatBot",routerChatBot)
router.use("/userInfo",routerUserInfo)
router.use("/logOut",routerLogOut)
router.use("/forgotPassword",routerForgotPassword)
export default router;