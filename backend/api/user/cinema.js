import express from "express";
import { cinema, cinemaID } from "../../controllers/user/cinema.js";
const routerCinema = express.Router()
routerCinema.post("/region_id=:region_id" ,cinema) 
routerCinema.post("/:cinema_name")
export default routerCinema;