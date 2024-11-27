import connection from "../../models/SQLConnection.js";

// [GET] /admin/users
export const index = async (req, res) => {
    // SELECT * FROM users;

    // Tìm kiếm
    const keyword = req.query.keyword ? `%${req.query.keyword}%` : '%'; // Nếu không có từ khóa, tìm tất cả
    // Hết Tìm kiếm

    // Phân trang
    let limitItems = 5;
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

    const sortKey = req.query.sortKey || "full_name";
    const sortValue = req.query.sortValue === "desc" ? "DESC" : "ASC";

    // Hết Sắp xếp theo tiêu chí

    const queryUser = 
        `SELECT *
        FROM users
        WHERE username LIKE ?
        ORDER BY ${sortKey} ${sortValue} 
        LIMIT ?
        OFFSET ?`;

    const users = await new Promise((resolve, reject) => {
        connection.query(queryUser, [keyword, limitItems, skip], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
  
    res.json(users);
};

// [GET] /admin/users/detail/:userId
export const detail = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const userInfo = {};

        // Truy vấn user
        const queryUser = `SELECT * FROM users WHERE user_id = ?`;
        const user = await new Promise((resolve, reject) => {
            connection.query(queryUser, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        userInfo.user = user;

        if(user.length > 0) {
            const queryOrder = 
                `SELECT o.*, f.film_name, c.cinema_name, r.room_name, s.show_date, pc.combo_name, po.combo_quantity, pc.combo_price
                FROM users u
                JOIN orders o ON u.user_id = o.user_id
                JOIN showtimes s ON o.showtime_id = s.showtime_id
                JOIN cinemas c ON s.cinema_id = c.cinema_id
                JOIN rooms r ON s.room_id = r.room_id
                JOIN films f on s.film_id = f.film_id
                JOIN popcorn_orders po ON o.order_id = po.order_id
                JOIN popcorn_combos pc ON po.combo_id = pc.combo_id
                WHERE u.user_id = ?`;
            userInfo.order = await new Promise((resolve, reject) => {
                connection.query(queryOrder, [userId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

            userInfo.order[0].combo_total_price = userInfo.order[0].combo_price * userInfo.order[0].combo_quantity;
            delete userInfo.order[0].combo_price;
            
            res.json(userInfo);
        }
        else {
            res.json({
                messages: {
                    error: "User not found"
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Not Found"
        });
    }
}

// [GET] /admin/users/edit/:userId
export const edit = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const userInfo = {};

        // Truy vấn user
        const queryUser = `SELECT * FROM users WHERE user_id = ?`;
        const user = await new Promise((resolve, reject) => {
            connection.query(queryUser, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        userInfo.user = user;

        if(user.length > 0) {            
            res.json(userInfo);
        }
        else {
            res.json({
                messages: {
                    error: "User not found"
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Not Found"
        });
    }
}

// [PATCH] /admin/users/edit/:userId
export const editPatch = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        // Không gửi ảnh khác lên
        if(res.locals.url == "") {
            let { username, user_img, email, phone_number, full_name, sex, date_of_birth, role } =  req.body;
            if(sex == "male") sex = 1;
            else sex = 2;
            if(role == "user") role = 0;
            else role = 1;

            // Update bảng User
            const queryUpdateUser = `
                UPDATE users
                SET username = ?, user_img = ?, email = ?, phone_number = ?, full_name = ?, sex = ?, date_of_birth = ?, role = ?
                WHERE user_id = ?`;
            await new Promise((resolve, reject) => {
                connection.query(queryUpdateUser, [username, user_img, email, phone_number, full_name, sex, date_of_birth, role, userId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

        } else { // Có gửi ảnh khác lên
            let { username, email, phone_number, full_name, sex, date_of_birth, role } =  req.body;
            if(sex == "male") sex = 1;
            else sex = 2;
            if(role == "user") role = 0;
            else role = 1;

            // Update bảng User
            const queryUpdateUser = `
                UPDATE users
                SET username = ?, user_img = ?, email = ?, phone_number = ?, full_name = ?, sex = ?, date_of_birth = ?, role = ?
                WHERE user_id = ?`;
            await new Promise((resolve, reject) => {
                connection.query(queryUpdateUser, [username, res.locals.url, email, phone_number, full_name, sex, date_of_birth, role, userId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
        }

        res.status(200).json({
            message: "User updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Not Found",
            error: error
        });
    }
}

// [DELETE] /admin/users/delete/:userId
export const deleteItem = async (req, res) => {
    try {
        const userId = req.params.userId;

        const [orderId] = await connection.promise().query(`SELECT order_id FROM orders WHERE user_id = ?`, [userId]);

        const queryDeleteUser = `DELETE FROM users WHERE user_id = ?`

        // Nếu user này đã từng order thì mới xóa
        if(orderId.length > 0) {
            // Xóa ở tickets
            const queryDeleteTicket = `DELETE FROM tickets WHERE order_id = ?`
            // Xóa ở popcorn_order
            const queryDeletePopcornOrder = `DELETE FROM popcorn_orders WHERE order_id = ?`

            const queryDeleteOrder = `DELETE FROM orders WHERE user_id = ?`;

            await Promise.all([
                connection.promise().query(queryDeleteTicket, [orderId[0].order_id]),
                connection.promise().query(queryDeletePopcornOrder, [orderId[0].order_id]),
                connection.promise().query(queryDeleteOrder, [userId]),
                connection.promise().query(queryDeleteUser, [userId]),
            ]);
        } else {
            await connection.promise().query(queryDeleteUser, [userId]);
        }

        res.status(200).json({
            message: "User and related records deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting User",
            error: error.message,
        });
    }
}