import express from "express";
import { filmInfo, filmShowing, filmShowTimeInfo, getComment, phim, postComment } from "../../controllers/user/film.js";
const routerFilm = express.Router()
routerFilm.post("/filmShowing" ,filmShowing) 
routerFilm.post("/filmInfo/id=:id",filmInfo)
routerFilm.post("/filmInfo/id=:id/lichChieu/khuVuc_id=:khuVuc_id",filmShowTimeInfo)
routerFilm.post("/filmInfo/getComment/id=:id",getComment)
routerFilm.post("/filmInfo/postComment",postComment)
routerFilm.post("/phim", phim)
export default routerFilm;