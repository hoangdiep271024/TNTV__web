import express from "express";
import getOrders from "../../controllers/user/orders.js";

const routerOrders = express.Router()
routerOrders.post("/",getOrders)

export default routerOrders;