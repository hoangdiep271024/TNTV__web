import express from "express";
import multer from "multer";

import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware.js";

import * as controller from "../../controllers/admin/film.js";

const upload = multer();

const filmRoutes = express.Router()

filmRoutes.get("/", controller.index);

filmRoutes.get("/detail/:id", controller.detail);

filmRoutes.post(
    "/create",
    upload.single("film_img"),
    uploadSingle,
    controller.create
);

filmRoutes.patch(
    "/edit/:id",
    upload.single("film_img"),
    uploadSingle,
    controller.edit
);

filmRoutes.delete("/delete/:id", controller.deleteFilm);

export default filmRoutes;