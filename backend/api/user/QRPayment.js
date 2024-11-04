import express from "express";
import { QRPayment, QRPaymentUpdate, giuGhe, huyGiuGhe } from "../../controllers/user/QRPayment.js";

const routerQRPayment = express.Router()
routerQRPayment.post("/giu_ghe",giuGhe)
routerQRPayment.post("/huy_giu_ghe",huyGiuGhe)
routerQRPayment.post("/",QRPayment)
routerQRPayment.post("/update",QRPaymentUpdate)
export default routerQRPayment