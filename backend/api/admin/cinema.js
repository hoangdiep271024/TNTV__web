import express from "express";

import * as controller from "../../controllers/admin/cinema.js";

const cinemaRoutes = express.Router()

cinemaRoutes.get("/", controller.index);

cinemaRoutes.get("/detail/:cinemaId", controller.detail);

cinemaRoutes.post("/create", controller.create);

cinemaRoutes.get("/edit/:cinemaId", controller.edit);

cinemaRoutes.patch("/edit/:cinemaId", controller.editPatch);

cinemaRoutes.delete("/delete/:cinemaId", controller.deleteItem);

export default cinemaRoutes;