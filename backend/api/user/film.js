import express from "express";
import { filmInfo, filmShowing, filmShowTimeInfo, getComment } from "../../controllers/user/film.js";
const routerFilm = express.Router()
routerFilm.post("/filmShowing" ,filmShowing) 
routerFilm.post("/filmInfo/id=:id",filmInfo)
routerFilm.post("/filmInfo/id=:id/lichChieu/khuVuc_id=:khuVuc_id",filmShowTimeInfo)
routerFilm.post("/filmInfo/getComment/id=:id",getComment)
export default routerFilm;