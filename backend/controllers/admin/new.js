import connection from "../../models/SQLConnection.js";

export const abc = (req, res) => {
    const authHeader = req.headers['authorization'];
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return res.status(401).json({
        //         messages: "Unauthorized.Please login first! 1",
        //         success: false
        //     });
        // }
    console.log(authHeader);
}

// [GET] /admin/news
export const index = async (req, res) => {
    // SELECT * FROM news;

    // Tìm kiếm
    const keyword = req.query.keyword ? `%${req.query.keyword}%` : '%'; // Nếu không có từ khóa, tìm tất cả
    // Hết Tìm kiếm

    // Phân trang
    let limitItems = 5;
    if (req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    }

    let page = 1;
    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }

    const skip = (page - 1) * limitItems;
    // Hết phân trang

    // Sắp xếp theo tiêu chí

    const sortKey = req.query.sortKey || "new_time";
    const sortValue = req.query.sortValue === "asc" ? "ASC" : "DESC";

    // Hết Sắp xếp theo tiêu chí

    const queryNew =
        `SELECT *
        FROM news
        WHERE new_header LIKE ?
        ORDER BY ${sortKey} ${sortValue} 
        LIMIT ?
        OFFSET ?`;

    const news = await new Promise((resolve, reject) => {
        connection.query(queryNew, [keyword, limitItems, skip], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

    res.json(news);
}

// [GET] /admin/news/detail/:newId
export const detail = async (req, res) => {
    const newId = req.params.newId;

    // truy vấn news
    const queryNews = `SELECT * FROM news WHERE new_id = ?`;
    const New = await new Promise((resolve, reject) => {
        connection.query(queryNews, [newId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

    const filmId = New[0].film_id;

    if (New.length > 0) {
        const queryFilm = `SELECT * FROM films WHERE film_id = ?`;
        const film = await new Promise((resolve, reject) => {
            connection.query(queryFilm, [filmId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        New[0].filmName = film[0].film_name;

        res.json(New[0]);
    } else {
        res.json({
            messages: {
                error: "Không tồn tại bản tin"
            }
        });
    }
}

// [GET] /admin/news/create
export const create = async (req, res) => {
    try {
        const [filmToChoose] = await connection.promise().query(`SELECT film_id, film_name FROM films`);
        res.status(200).json({
            filmToChoose: filmToChoose
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi tạo mới bản tin",
            error: error
        });
    }
}

// [POST] /admin/news/create
export const createPost = async (req, res) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        let { film_name, new_content, new_header, new_footer } = req.body;

        const countResult = await connection.promise().query(
            `SELECT COUNT(*) as count FROM news`,
        );
        const totalNews = countResult[0][0].count;
        const newId = totalNews + 1;

        const [film] = await connection.promise().query(`SELECT film_id FROM films WHERE film_name = ?`, [film_name]);
        if (film.length === 0) {
            return res.status(500).json({
                message: "Phim không tồn tại. Vui lòng chọn lại phim!"
            });
        }
        const filmId = film[0].film_id;

        // Lưu data vào bảng news
        const queryNews = `INSERT INTO news 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const New = await new Promise((resolve, reject) => {
            connection.query(queryNews, [newId, filmId, new_content, res.locals.url, formattedDate, new_header, new_footer, res.locals.user[0].user_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // Kiểm tra xem bản ghi có được tạo thành công không
        if (New) {
            res.status(201).json({
                message: "Tạo bản tin thành công",
                NewId: New.insertId, // ID của bản ghi mới được tạo
            });
        } else {
            res.status(500).json({
                message: "Lỗi tạo mới bản tin",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Lỗi tạo mới bản tin",
            error: error
        });
    }
}

// [GET] /admin/news/edit/:newId
export const edit = async (req, res) => {
    try {
        const newId = req.params.newId;

        // truy vấn news
        const queryNews = `SELECT * FROM news WHERE new_id = ?`;
        const New = await new Promise((resolve, reject) => {
            connection.query(queryNews, [newId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        const filmId = New[0].film_id;

        if (New.length > 0) {
            const queryFilm = `SELECT * FROM films WHERE film_id = ?`;
            const film = await new Promise((resolve, reject) => {
                connection.query(queryFilm, [filmId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            New[0].filmName = film[0].film_name;

            const [filmToChoose] = await connection.promise().query(`SELECT film_id, film_name FROM films`);
            res.status(200).json({
                New: New[0],
                filmToChoose: filmToChoose
            });
        } else {
            res.json({
                messages: {
                    error: "Không tìm thấy bản tin"
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messages: {
                error: "Không tìm thấy bản tin"
            }
        });
    }
}

// [PATCH] /admin/news/edit/:newId
export const editPatch = async (req, res) => {
    try {
        const newId = parseInt(req.params.newId);

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;


        // Khi không gửi lên ảnh mới thì giữ nguyên cái link cũ
        if (res.locals.url == "") {
            let { film_name, new_content, new_header, new_footer } = req.body;

            const [film] = await connection.promise().query(`SELECT film_id FROM films WHERE film_name = ?`, [film_name]);
            if (film.length == 0) {
                return res.status(500).json({
                    message: "Phim không tồn tại. Vui lòng chọn lại phim!",
                });
            }
            const filmId = film[0].film_id;

            // Update bảng news
            const queryUpdateNew = `
                UPDATE news
                SET film_id = ?, new_content = ?, new_time = ?, new_header = ?, new_footer = ?, user_id = ?
                WHERE new_id = ?`;
            await new Promise((resolve, reject) => {
                connection.query(queryUpdateNew, [filmId, new_content, formattedDate, new_header, new_footer, res.locals.user[0].user_id, newId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

        } else { // Khi mà tải lên ảnh mới thì link ảnh thay bằng res.locals.url
            let { film_name, new_content, new_header, new_footer } = req.body;

            const [film] = await connection.promise().query(`SELECT film_id FROM films WHERE film_name = ?`, [film_name]);
            if (film.length == 0) {
                return res.status(500).json({
                    message: "Phim không tồn tại. Vui lòng chọn lại phim!"
                });
            }
            const filmId = film[0].film_id;

            // Update bảng news
            const queryUpdateNew = `
                UPDATE news
                SET film_id = ?, new_content = ?, new_img = ?, new_time = ?, new_header = ?, new_footer = ?, user_id = ?
                WHERE new_id = ?`;
            await new Promise((resolve, reject) => {
                connection.query(queryUpdateNew, [filmId, new_content, res.locals.url, formattedDate, new_header, new_footer, res.locals.user[0].user_id, newId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
        }

        res.status(200).json({
            message: "Cập nhật bản tin và các bản ghi liên quan thành công!",
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Lỗi khi sửa bản tin",
            error: error
        });
    }
}

// [DELETE] /admin/news/delete/:newId
export const deleteItem = async (req, res) => {
    try {
        const newId = req.params.newId;

        const deleteResult = await connection.promise().query(`DELETE FROM news WHERE new_id = ?`, [newId]);

        if (deleteResult.affectedRows < 0) {
            return res.status(501).json({
                message: "Bản tin cần xóa không tồn tại",
            });
        }

        res.status(200).json({
            message: "Xóa bản tin và các bản ghi liên quan thành công",
        });
    } catch (error) {
        console(error);
        res.status(501).json({
            message: "Lỗi khi xóa bản tin",
            error: error
        });
    }
}