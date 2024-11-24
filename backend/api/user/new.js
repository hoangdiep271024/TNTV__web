import express from "express";
import { filmNew } from "../../controllers/user/new.js";
const routerNew = express.Router()
routerNew.post('/', filmNew) 

export default routerNew