import express from "express";

import * as controller from "../../controllers/admin/film.js";

const filmRoutes = express.Router()

filmRoutes.get("/", controller.index);

filmRoutes.get("/detail/:id", controller.detail);

filmRoutes.post("/create", controller.create);

filmRoutes.patch("/edit/:id", controller.edit);

filmRoutes.delete("/delete/:id", controller.deleteFilm);

export default filmRoutes;