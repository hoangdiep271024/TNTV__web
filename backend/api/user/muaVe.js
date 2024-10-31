import express from "express";
import { showSeat } from "../../controllers/user/muaVe.js";

const routerMuaVe = express.Router()
routerMuaVe.post("/showtime_id=:showtime_id",showSeat)

export default routerMuaVe