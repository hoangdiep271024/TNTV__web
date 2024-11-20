import express from "express";
import { likeCheck } from "../../controllers/user/like.js";

const routerLike = express.Router()
routerLike.post("/likeCheck/film_id=:film_id", likeCheck)
export default routerLike;