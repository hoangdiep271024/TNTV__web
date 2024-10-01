import express from "express";
import payment from "../controllers/payment";

const routerPayment = express.Router()
routerPayment.post("/",payment)

export default routerPayment