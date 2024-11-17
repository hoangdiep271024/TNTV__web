import connection from "../../models/SQLConnection.js";

import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
const getOrders = async (req, res) => {
    const token = req.cookies.jwt;

        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        if (isTokenExpired(token)) {
            res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);
    const user_id = decoded.id
    
    try {
        // Truy vấn thông tin đơn hàng từ bảng orders
        const [orderData] = await connection.promise().query(
            `SELECT 
                o.order_id,
                o.order_date,
                o.total_price,
                st.show_date,
                st.show_time,
                c.cinema_name,
                r.room_name,
                f.film_id,
                f.film_name,
                f.film_img
            FROM 
                orders o
            JOIN 
                showtimes st ON o.showtime_id = st.showtime_id
            JOIN 
                cinemas c ON st.cinema_id = c.cinema_id
            JOIN 
                rooms r ON st.room_id = r.room_id
            JOIN 
                films f ON st.film_id = f.film_id
            WHERE 
                o.user_id = ?;`,
            [user_id]
        );

        if (orders.length === 0) {
            return res.status(404).json({ message: "Không có đơn hàng nào được tìm thấy" });
        }

        // Lấy thông tin chi tiết cho từng order
        const ordersInfo = await Promise.all(
            orders.map(async (order) => {
                // Truy vấn thông tin vé
                const [tickets] = await connection.promise().query(
                    `SELECT 
                        CONCAT(s.seat_row, s.seat_number) AS seat,
                        t.ticket_price AS price
                    FROM 
                        tickets t
                    JOIN orders o ON t.order_id = o.order_id
                    JOIN seats s ON t.seat_id = s.seat_id
                    WHERE 
                        t.order_id = ?`,
                    [order.order_id]
                );

                // Truy vấn thông tin bắp nước
                const [popcorn] = await connection.promise().query(
                    `SELECT 
                        pc.combo_name AS name,
                        po.combo_quantity AS quantity,
                        pc.combo_price * po.combo_quantity AS price
                    FROM 
                        popcorn_orders po
                    JOIN popcorn_combos pc ON po.combo_id = pc.combo_id
                    WHERE 
                        po.order_id = ?`,
                    [order.order_id]
                );

                // Cấu trúc dữ liệu trả về
                return {
                    film_id: order.film_id,
                    film_name: order.film_name,
                    film_img: order.film_img,
                    order_id: order.order_id,
                    order_date: order.order_date,
                    total_price: order.total_price,
                    show_date: order.show_date,
                    show_time: order.show_time,
                    cinema_name: order.cinema_name,
                    room_name: order.room_name,
                    tickets: tickets,
                    popcorn: popcorn
                };
            })
        );

        res.json(ordersInfo);
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default getOrders