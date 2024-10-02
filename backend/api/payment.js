import express from "express";
import payment2 from "../controllers/payment2.js";

const routerPayment = express.Router()
routerPayment.post("/",payment2)

export default routerPayment