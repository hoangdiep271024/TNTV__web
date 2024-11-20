import express from "express";
import routerChatBot from "./chatBot.js";
import routerCinema from "./cinema.js";
import routerFilm from "./film.js";
import routerForgotPassword from "./forgotPassword.js";
import routerLichChieu from "./lichChieu.js";
import routerLogin from "./login.js";
import routerLogOut from "./logOut.js";
import routerMuaVe from "./muaVe.js";
import routerOrders from "./orders.js";
import routerQRPayment from "./QRPayment.js";
import routerSignUp from "./signUp.js";
import routerUploadImage from "./uploadImage.js";
import routerUserInfo from "./userInfo.js";
import routerLike from "./Like.js";
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
router.use("/muaVe",routerMuaVe)
router.use("/orders",routerOrders)
router.use("/rap",routerCinema)
router.use("/like",routerLike)
export default router;