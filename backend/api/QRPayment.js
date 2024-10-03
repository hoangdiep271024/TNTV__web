import express from "express";
import QRPayment from "../controllers/QRPayment.js";

const routerQRPayment = express.Router()
routerQRPayment.post("/",QRPayment)

export default routerQRPayment