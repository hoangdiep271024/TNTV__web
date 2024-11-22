import express from "express";
import getOrderDetail from "../../controllers/user/orders.js";

const routerOrders = express.Router()
routerOrders.post("/",getOrderDetail)
export default routerOrders;