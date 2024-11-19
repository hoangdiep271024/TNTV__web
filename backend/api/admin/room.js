import express from "express";

import * as controller from "../../controllers/admin/room.js";

const roomRoutes = express.Router()

roomRoutes.get("/", controller.index);

roomRoutes.get("/detail/:roomId", controller.detail);

roomRoutes.post("/create", controller.create);

roomRoutes.patch("/edit/:roomId", controller.editPatch);

roomRoutes.delete("/delete/:roomId", controller.deleteItem);

export default roomRoutes;