import express from "express";
import { filmInfo, filmShowing } from "../controllers/film.js";
const routerFilm = express.Router()
routerFilm.post("/filmShowing" ,filmShowing) 
routerFilm.post("/filmInfo/id=:id",filmInfo)

export default routerFilm;