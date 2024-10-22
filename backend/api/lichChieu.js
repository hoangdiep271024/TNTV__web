import express from "express";
import { khuVuc, rap } from "../controllers/lichChieu.js";

const routerLichChieu = express.Router()
routerLichChieu.post("/khuVuc",khuVuc)
routerLichChieu.post("/khuVuc/khuVuc_id=:khuVuc_id",rap)

export default routerLichChieu;