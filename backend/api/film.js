import express from "express";
import { filmInfo, filmShowing, filmShowTimeInfo } from "../controllers/film.js";
const routerFilm = express.Router()
routerFilm.post("/filmShowing" ,filmShowing) 
routerFilm.post("/filmInfo/id=:id",filmInfo)
routerFilm.post("/filmInfo/id=:id/lichChieu/khuVuc_id=:khuVuc_id",filmShowTimeInfo)
export default routerFilm;