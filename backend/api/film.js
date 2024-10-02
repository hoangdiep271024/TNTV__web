import express from "express";
import filmShowing from "../controllers/film.js";
const routerFilm = express.Router()
routerFilm.post("/" ,filmShowing) 
export default routerFilm;