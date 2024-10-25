import sequelize from "../../config/database.js";

// [GET] /admin/films
export const index = async (req, res) => {
    // SELECT * FROM films WHERE deleted = false;

    // Lọc theo trạng thái
    const status = req.query.status;
    let filmType = '(film_type = 1 OR film_type = 0)';

    if(status) {
        if(status == "Showing") filmType = 'film_type = 1';
        else if(status == "Coming") filmType = 'film_type = 0';
    }
    // Hết lọc theo trạng thái

    // Tìm kiếm
    const keyword = req.query.keyword ? `%${req.query.keyword}%` : '%'; // Nếu không có từ khóa, tìm tất cả
    // Hết Tìm kiếm

    // Phân trang
    let limitItems = 8;
    if(req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    }

    let page = 1;
    if(req.query.page) {
        page = parseInt(`${req.query.page}`);
    }

    const skip = (page - 1) * limitItems;
    // Hết phân trang

    // Sắp xếp theo tiêu chí

    const sortKey = req.query.sortKey || "film_name";
    const sortValue = req.query.sortValue === "desc" ? "DESC" : "ASC";

    // Hết Sắp xếp theo tiêu chí

    const films = await sequelize.query(
        `SELECT * FROM films
        WHERE ${filmType} 
        AND film_name LIKE :keyword 
        ORDER BY ${sortKey} ${sortValue}
        LIMIT :limitItems
        OFFSET :skip`,
        {
            type: sequelize.QueryTypes.SELECT,
            raw: true,
            replacements: {
                keyword,
                limitItems,
                skip,
            }
        }
    );
  
    res.json(films);
};

// [GET] /admin/films/detail/:id
export const detail = async (req, res) => {
    try {
        const filmId = req.params.id;

        const filmInfo = {};
    
        filmInfo.film = await sequelize.query(`Select * from films where films.film_id = :filmId`,
            {
            replacements: { filmId },
            type: sequelize.QueryTypes.SELECT,
            }
        );

        filmInfo.actors = await sequelize.query(
                            `Select A.actor_id,A.actor_name
                            from actors as A
                            inner join actor_film as AF on A.actor_id = AF.actor_id
                            inner join films as F on AF.film_id = F.film_id
                            where F.film_id = :filmId`,
                            {
                                replacements: { filmId },
                                type: sequelize.QueryTypes.SELECT,
                            }
                        );

        filmInfo.directors = await sequelize.query(
                                `Select D.director_id,D.director_name
                                from directors as D
                                inner join director_film as DF on D.director_id = DF.director_id
                                inner join films as F on DF.film_id = F.film_id
                                where F.film_id = :filmId`,
                                {
                                    replacements: { filmId },
                                    type: sequelize.QueryTypes.SELECT,
                                }
                            );

        filmInfo.categories = await sequelize.query(
                                `Select C.category_id,C.category_name
                                from categorys as C
                                inner join category_film as CF on C.category_id = CF.category_id
                                inner join films as F on CF.film_id = F.film_id
                                where F.film_id = :filmId`,
                                {
                                    replacements: { filmId },
                                    type: sequelize.QueryTypes.SELECT,
                                }
        );
        
        res.json(filmInfo);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Not Found"
        });
    }
}

// [POST] /admin/films/create
export const create = async (req, res) => {
    const { film_name, film_img, film_trailer, Release_date, film_describe, age_limit, duration, film_type, country, categories, directors, actors } =  req.body;

    const countResult = await sequelize.query(
        `SELECT COUNT(*) as count FROM films`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    );
    const totalFilms = countResult[0].count;
    const filmId =  totalFilms + 1;

    // Lưu data vào bảng films
    const film = await sequelize.query(
        `INSERT INTO films 
        VALUES (:filmId, :film_name, :film_img, :film_trailer, :Release_date, :film_describe, :age_limit, :duration, :film_type, :country)`,
        {
            replacements: { filmId, film_name, film_img, film_trailer, Release_date, film_describe, age_limit, duration, film_type, country },
            type: sequelize.QueryTypes.INSERT,
        }
    );

    // Lưu data vào bảng actor_film
    for(const actor of actors) {
        const actorInfo = await sequelize.query(
            `SELECT actor_id FROM actors WHERE actor_name = :actorName`,
            {
                replacements: { actorName: actor },
                type:  sequelize.QueryTypes.SELECT,
            }
        );
        const actorId = actorInfo[0].actor_id;
        await sequelize.query(
            `INSERT INTO actor_film VALUES (:filmId, :actorId)`,
            {
                replacements: { filmId: filmId, actorId: actorId },
                type: sequelize.QueryTypes.INSERT,
            }
        );
    }
    
    // // Lưu data vào bảng director_film
    for(const director of directors) {
        const directorInfo = await sequelize.query(
            `SELECT director_id FROM directors WHERE director_name = :directorName`,
            {
                replacements: { directorName: director },
                type:  sequelize.QueryTypes.SELECT,
            }
        );
        const directorId = directorInfo[0].director_id;
        await sequelize.query(
            `INSERT INTO director_film VALUES (:filmId, :directorId)`,
            {
                replacements: { filmId: filmId, directorId: directorId },
                type: sequelize.QueryTypes.INSERT,
            }
        );
    }

    // Lưu data vào bảng category_film
    for(const category of categories) {
        const categoryInfo = await sequelize.query(
            `SELECT category_id FROM categorys WHERE category_name = :categoryName`,
            {
                replacements: { categoryName: category },
                type:  sequelize.QueryTypes.SELECT,
            }
        );
        const categoryId = categoryInfo[0].category_id;
        await sequelize.query(
            `INSERT INTO category_film VALUES (:categoryId, :filmId)`,
            {
                replacements: { categoryId: categoryId, filmId: filmId },
                type: sequelize.QueryTypes.INSERT,
            }
        );
    }

    // Kiểm tra xem bản ghi có được tạo thành công không
    if (film) {
        res.status(201).json({
            message: "Film created successfully",
            filmId: film[0], // ID của bản ghi mới được tạo
        });
    } else {
        res.status(500).json({
            message: "Error creating film",
        });
    }
}

// [PATCH] /admin/films/edit/:id
export const edit = async (req, res) => {
    try {
        const filmId = parseInt(req.params.id);
  
        const { film_name, film_img, film_trailer, Release_date, film_describe, age_limit, duration, film_type, country, categories, directors, actors } =  req.body;

        const update = await sequelize.query(
            `UPDATE films
            SET film_name = :film_name, film_img = :film_img, film_trailer = :film_trailer, Release_date = :Release_date, film_describe = :film_describe, age_limit = :age_limit, duration = :duration, film_type = :film_type, country = :country
            WHERE film_id = :filmId`,
            {
                replacements: { film_name, film_img, film_trailer, Release_date, film_describe, age_limit, duration, film_type, country, filmId},
                type: sequelize.QueryTypes.UPDATE,
            }
        )
        res.status(200).json({
            message: "Film updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Not Found",
            error: error.message
        });
    }
}

// [PATCH] /admin/films/delete/:id
export const deleteFilm = async (req, res) => {
    try {
        const filmId = req.params.id;
    
        await Promise.all([
            sequelize.query(`DELETE FROM actor_film WHERE film_id = :filmId`, {
                replacements: { filmId },
                type: sequelize.QueryTypes.DELETE,
            }),
            sequelize.query(`DELETE FROM director_film WHERE film_id = :filmId`, {
                replacements: { filmId },
                type: sequelize.QueryTypes.DELETE,
            }),
            sequelize.query(`DELETE FROM category_film WHERE film_id = :filmId`, {
                replacements: { filmId },
                type: sequelize.QueryTypes.DELETE,
            }),
            sequelize.query(`DELETE FROM films WHERE film_id = :filmId`, {
                replacements: { filmId },
                type: sequelize.QueryTypes.DELETE,
            }),
        ]);

        res.status(200).json({
            message: "Film and related records deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting film",
            error: error.message,
        });
    }
}