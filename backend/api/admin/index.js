import { systemConfig } from "../../config/system.js";
import filmRoutes from "../../api/admin/film.js";
import cinemaRoutes from "../../api/admin/cinema.js";
import roomRoutes from "../../api/admin/room.js";
import showTimeRoutes from "../../api/admin/showtime.js";

export const adminApi = (app) => {

    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`/${PATH_ADMIN}/films`, filmRoutes);

    app.use(`/${PATH_ADMIN}/cinemas`, cinemaRoutes);

    app.use(`/${PATH_ADMIN}/rooms`, roomRoutes);

    app.use(`/${PATH_ADMIN}/showtimes`, showTimeRoutes);
}