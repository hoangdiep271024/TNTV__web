import express from "express";
import userInfo from "../controllers/userInfo.js";

const routerUserInfo = express.Router()
routerUserInfo.post("/",userInfo)

export default routerUserInfo; 