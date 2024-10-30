import express from "express";
import QRPayment from "../../controllers/user/QRPayment.js";

const routerQRPayment = express.Router()
routerQRPayment.post("/",QRPayment)

export default routerQRPayment