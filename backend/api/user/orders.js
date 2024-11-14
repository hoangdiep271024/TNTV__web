import express from "express";
import getOrderDetail from "../../controllers/user/orders.js";

const routerOrders = express.Router()
routerOrders.post("/order_id=:order_id",getOrderDetail)

export default routerOrders;