import express from "express";
import { filmNew, newVietnam, newAboard, NewDetail } from "../../controllers/user/new.js";
const routerNew = express.Router()
routerNew.post('/', filmNew) 
routerNew.post('/vietnam',newVietnam) 
routerNew.post('/aboard', newAboard) 
routerNew.post('/:new_id', NewDetail)
export default routerNew