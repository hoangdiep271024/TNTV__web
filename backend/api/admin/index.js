import { systemConfig } from "../../config/system.js";
import filmRoutes from "../../api/admin/film.js";

export const adminApi = (app) => {

    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`/${PATH_ADMIN}/films`, filmRoutes);

};