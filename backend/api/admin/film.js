import express from "express";

import * as controller from "../../controllers/admin/film.js";

import { handleUpload } from "../../middlewares/uploadCloud.js";

const filmRoutes = express.Router()

filmRoutes.get("/", controller.index);

filmRoutes.get("/detail/:id", controller.detail);

filmRoutes.post(
    "/create", async (req, res) =>{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        controller.create
    }
);

filmRoutes.patch(
    "/edit/:id",async (req, res) =>{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        controller.create
    }
);

filmRoutes.delete("/delete/:id", controller.deleteFilm);

export default filmRoutes;