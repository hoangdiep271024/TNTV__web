import express from "express";
import { filmNew, newVietnam, newAboard } from "../../controllers/user/new.js";
const routerNew = express.Router()
routerNew.post('/', filmNew) 
routerNew.post('/vietnam',newVietnam) 
routerNew.post('/aboard', newAboard) 
export default routerNew