import express from "express";

import * as controller from "../../controllers/admin/showtime.js";

const showTimeRoutes = express.Router()

showTimeRoutes.get("/", controller.index);

showTimeRoutes.get("/detail/:showTimeId", controller.detail);

showTimeRoutes.post("/create", controller.create);

showTimeRoutes.patch("/edit/:showTimeId", controller.editPatch);

showTimeRoutes.delete("/delete/:showTimeId", controller.deleteItem);

export default showTimeRoutes;