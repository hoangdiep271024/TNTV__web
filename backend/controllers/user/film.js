import dotenv from "dotenv";
import calculateTicketPrice from "../../middlewares/user/seatPrice.js";
import connection from "../../models/SQLConnection.js";

dotenv.config();

export const filmShowing = async (req, res) => {
    try {
        const results = await connection.promise().query('SELECT * FROM films WHERE film_type = 1 or film_type = 2');
        return res.json(results);
        // Trả kết quả về cho client
    } catch (error) {
        console.error('Lỗi:', error.message);
        res.status(500).json({ error: error.message }); // Xử lý lỗi
    }
};

export const filmInfo = async (req, res) => {
    var postInfo = {
        film: [],
        evaluate: [],
        actors: [],
        directors: [],
        categorys: []
    };

    try {
        // Truy vấn thông tin phim
        const queryFilm = `Select * from films where films.film_id = ?`;
        const filmResults = await new Promise((resolve, reject) => {
            connection.query(queryFilm, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.film = filmResults;

        const queryEvaluate = `Select film_rate,sum_rate from film_evaluate where film_id = ?`;
        const evaluateResults = await new Promise((resolve, reject) => {
            connection.query(queryEvaluate, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.evaluate = evaluateResults;

        // Truy vấn diễn viên
        const queryActor = `Select A.actor_id,A.actor_name
                            from actors as A
                            inner join actor_film as AF on A.actor_id = AF.actor_id
                            inner join films as F on AF.film_id = F.film_id
                            where F.film_id = ?`;
        const actorResults = await new Promise((resolve, reject) => {
            connection.query(queryActor, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.actors = actorResults;
        // Truy vấn đạo diễn
        const queryDirector = `Select D.director_id,D.director_name
                               from directors as D
                               inner join director_film as DF on D.director_id = DF.director_id
                               inner join films as F on DF.film_id = F.film_id
                               where F.film_id = ?`;
        const directorResults = await new Promise((resolve, reject) => {
            connection.query(queryDirector, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.directors = directorResults;

        // Truy vấn thể loại
        const queryCategory = `Select C.category_id,C.category_name
                               from categorys as C
                               inner join category_film as CF on C.category_id = CF.category_id
                               inner join films as F on CF.film_id = F.film_id
                               where F.film_id = ?`;
        const categoryResults = await new Promise((resolve, reject) => {
            connection.query(queryCategory, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.categorys = categoryResults;
        // Trả về kết quả
        return res.json({
            success: true,
            info: postInfo
        });

    } catch (err) {
        return res.json({
            message: err.message,
            success: false
        });
    }
};

export const filmShowTimeInfo = async (req, res) => {
    const regionId = req.params.khuVuc_id;
    const filmId = req.params.id;
    // Truy vấn MySQL
    const query = `
        SELECT cluster_name,cinemas.cinema_id,cinema_name,address,show_date,show_time,showtime_id
        FROM cinemas inner join cinema_clusters on cinemas.cluster_id = cinema_clusters.cluster_id
        inner join showtimes on cinemas.cinema_id = showtimes.cinema_id
        WHERE region_id = ? and film_id = ?
    `;

    //     SELECT cluster_name, cinemas.cinema_id, cinema_name, address, show_date, show_time, showtime_id
    // FROM cinemas 
    // INNER JOIN cinema_clusters ON cinemas.cluster_id = cinema_clusters.cluster_id
    // INNER JOIN showtimes ON cinemas.cinema_id = showtimes.cinema_id
    // WHERE region_id = ? 
    //   AND film_id = ? 
    //   AND CONCAT(show_date, ' ', show_time) > CURRENT_TIMESTAMP
    //   AND show_date <= (
    //     SELECT MIN(show_date) + INTERVAL 4 DAY 
    //     FROM showtimes 
    //     WHERE region_id = ? 
    //       AND film_id = ?
    //   );

    connection.query(query, [regionId, filmId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Xử lý kết quả
        const postOut = {};

        results.forEach(row => {
            const { cluster_name, cinema_id, cinema_name, address, show_date, show_time, showtime_id } = row;

            // Chuyển đổi show_date thành định dạng YYYY-MM-DD
            // new Date(show_date).toISOString().split('T')[0];
            const date = new Date(show_date);
            const weekday = date.toLocaleDateString('en', { weekday: 'long' }); // Lấy thứ bằng tiếng Việt
            const day = date.getDate(); // Lấy ngày
            const month = date.getMonth() + 1; // Lấy tháng (thêm 1 vì getMonth() trả về từ 0-11)
            const year = date.getFullYear();

            const formattedShowDate = weekday + " " + day + "-" + month + "-" + year

            // Kiểm tra nếu cluster chưa tồn tại, tạo một đối tượng trống
            if (!postOut[formattedShowDate]) {
                postOut[formattedShowDate] = {};
            }

            // Kiểm tra nếu cinema_id chưa tồn tại trong cluster, tạo đối tượng cho rạp đó
            if (!postOut[formattedShowDate][cluster_name]) {
                postOut[formattedShowDate][cluster_name] = {}
            }

            // Kiểm tra nếu cinema_id chưa tồn tại trong cluster, tạo đối tượng cho rạp đó
            if (!postOut[formattedShowDate][cluster_name][cinema_name]) {
                postOut[formattedShowDate][cluster_name][cinema_name] = {
                    address: address,
                    show_time: []
                }
            }

            // Thêm show_time vào mảng showtimes cho show_date tương ứng
            postOut[formattedShowDate][cluster_name][cinema_name].show_time.push({
                show_time: show_time,
                showtime_id: showtime_id,
                seatPrice: calculateTicketPrice('0', weekday, show_time)
            });
        });

        res.json(postOut);
    });
}

export const getCommend = async (req, res) => {
    const filmId = req.params.id;
    // Truy vấn MySQL
    const query = `
        select users.user_id, users.full_name, comments, star, date_posted from evaluate
        left join users on evaluate.user_id = users.user_id
        where film_id = 1
    `;
    connection.query(query, [filmId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        res.json({
            numberOfComment: results.length,
            comment: results
        });
    });
}

