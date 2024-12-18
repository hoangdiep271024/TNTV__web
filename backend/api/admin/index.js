import { systemConfig } from "../../config/system.js";
import filmRoutes from "../../api/admin/film.js";
import cinemaRoutes from "../../api/admin/cinema.js";
import roomRoutes from "../../api/admin/room.js";
import showTimeRoutes from "../../api/admin/showtime.js";
import orderRoutes from "../../api/admin/order.js";
import userRoutes from "./user.js";
import dashboardRoutes from "./dashboard.js";
import newsRoutes from "./new.js";

import { checkPermisson } from "../../middlewares/checkPermission.js";

export const adminApi = (app) => {

    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`/${PATH_ADMIN}/films`, checkPermisson, filmRoutes);

    app.use(`/${PATH_ADMIN}/cinemas`, checkPermisson, cinemaRoutes);

    app.use(`/${PATH_ADMIN}/rooms`, checkPermisson, roomRoutes);

    app.use(`/${PATH_ADMIN}/showtimes`, checkPermisson, showTimeRoutes);

    app.use(`/${PATH_ADMIN}/orders`, checkPermisson, orderRoutes);

    app.use(`/${PATH_ADMIN}/users`, checkPermisson, userRoutes);

    app.use(`/${PATH_ADMIN}/dashboard`, checkPermisson, dashboardRoutes);

    app.use(`/${PATH_ADMIN}/news`, checkPermisson, newsRoutes);
}