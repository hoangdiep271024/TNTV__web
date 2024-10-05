import express from "express";
import logOut from "../controllers/logOut.js";

const routerLogOut = express.Router()
routerLogOut.post("/",logOut)

export default routerLogOut;