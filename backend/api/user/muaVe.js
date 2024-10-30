import express from "express";
import showSeat from "../../controllers/user/QRPayment.js";

const routerMuaVe = express.Router()
routerMuaVe.post("/showtime_id=:showtime_id",showSeat)

export default routerMuaVe