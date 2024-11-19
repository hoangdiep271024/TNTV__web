import connection from "../../models/SQLConnection.js";

// [GET] /admin/rooms
export const index = async (req, res) => {
    // SELECT * FROM rooms;

    // // Lọc theo trạng thái
    // const status = req.query.status;
    // let filmType = '(film_type = 1 OR film_type = 0)';

    // if(status) {
    //     if(status == "Showing") filmType = 'film_type = 1';
    //     else if(status == "Coming") filmType = 'film_type = 0';
    // }
    // // Hết lọc theo trạng thái

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

    const sortKey = req.query.sortKey || "room_id";
    const sortValue = req.query.sortValue === "desc" ? "DESC" : "ASC";

    // Hết Sắp xếp theo tiêu chí

    const query = 
        `SELECT * FROM rooms
        WHERE room_name LIKE ? 
        ORDER BY ${sortKey} ${sortValue}
        LIMIT ?
        OFFSET ?`;

    const rooms = await new Promise((resolve, reject) => {
        connection.query(query, [keyword, limitItems, skip], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
  
    res.json(rooms);
};

// [GET] /admin/rooms/detail/:roomId
export const detail = async (req, res) => {
    try {
        const roomId = parseInt(req.params.roomId);

        const roomInfo = {};
    
        const queryRoom = `Select * from rooms where rooms.room_id = ?`;
        roomInfo.room = await new Promise((resolve, reject) => {
            connection.query(queryRoom, [roomId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        const queryCinema = `Select c.cinema_id, c.cinema_name, c.address
                            from cinemas as c
                            inner join rooms as r on c.cinema_id = r.cinema_id
                            where r.room_id = ?`;
        roomInfo.cinema = await new Promise((resolve, reject) => {
            connection.query(queryCinema, [roomId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        
        res.json(roomInfo);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Not Found"
        });
    }
}

// [POST] /admin/rooms/create
export const create = async (req, res) => {
    const { room_name, cinema_name } =  req.body;

    const countResult = await connection.promise().query(
        `SELECT COUNT(*) as count FROM rooms`,
    );
    const totalRooms = countResult[0][0].count;
    const roomId =  totalRooms + 1;

    // Truy vấn cinema_id từ cinema_name
    const  queryCinema = `Select cinema_id from cinemas where cinema_name = ?`
    const cinemaInfo = await new Promise((resolve, reject) => {
        connection.query(queryCinema, [cinema_name], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
    const cinemaId = cinemaInfo[0].cinema_id;

    // Lưu data vào bảng rooms
    const queryInsertRoom = `INSERT INTO rooms 
                            VALUES (?, ?, ?)`;
    const room = await new Promise((resolve, reject) => {
        connection.query(queryInsertRoom, [roomId, room_name, cinemaId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

    // Kiểm tra xem bản ghi có được tạo thành công không
    if (room) {
        res.status(201).json({
            message: "Room created successfully",
            roomId: room[0], // ID của bản ghi mới được tạo
        });
    } else {
        res.status(500).json({
            message: "Error creating room",
        });
    }
}

// [PATCH] /admin/rooms/edit/:roomId
export const editPatch = async (req, res) => {
    try {
        const roomId = parseInt(req.params.roomId);
  
        const { room_name, cinema_name } =  req.body;

        // Truy vấn cinema_id từ cinema_name
        const  queryCinema = `Select cinema_id from cinemas where cinema_name = ?`
        const cinemaInfo = await new Promise((resolve, reject) => {
            connection.query(queryCinema, [cinema_name], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        const cinemaId = cinemaInfo[0].cinema_id;

        const queryUpdateRoom = `UPDATE rooms
                                SET room_name = ?, cinema_id = ?
                                WHERE room_id = ?`;
        await new Promise((resolve, reject) => {
            connection.query(queryUpdateRoom, [room_name, cinemaId, roomId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        res.status(200).json({
            message: "Room updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Not Found",
            error: error.message
        });
    }
}

// [PATCH] /admin/rooms/delete/:roomId
export const deleteItem = async (req, res) => {
    try {
        const roomId = req.params.roomId;

        const queryDeleteRoom = `DELETE FROM rooms WHERE room_id = ?`;
        await new Promise((resolve, reject) => {
            connection.query(queryDeleteRoom, [roomId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        res.status(200).json({
            message: "Room and related records deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting room",
            error: error.message,
        });
    }
}