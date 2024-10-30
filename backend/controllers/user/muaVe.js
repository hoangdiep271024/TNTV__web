
export const showSeat = async (req, res) => {
    try {
        const showtime_id = req.params.showtime_id;

        // Thực hiện join các bảng cần thiết để lấy thông tin
        const result = await db.query(`
            SELECT 
                films.film_name,
                cinemas.cinema_name,
                showtimes.show_time,
                showtimes.show_date,
                rooms.room_name,
                seats.seat_row,
                seats.seat_number,
                seats.seat_status,
                seats.seat_type
            FROM showtimes
            JOIN films ON showtimes.film_id = films.film_id
            JOIN cinemas ON showtimes.cinema_id = cinemas.cinema_id
            JOIN rooms ON showtimes.room_id = rooms.room_id
            JOIN seats ON rooms.room_id = seats.room_id
            WHERE showtimes.showtime_id = ?
        `, [showtime_id]);

        // Xử lý dữ liệu kết quả để trả về đúng định dạng mong muốn
        const postOut = {
            film_name: result[0]?.film_name,
            cinema_name: result[0]?.cinema_name,
            show_time: result[0]?.show_time,
            show_date: result[0]?.show_date,
            room_name: result[0]?.room_name,
            seats: result.map(row => ({
                seat_location: row.seat_row + row.seat_number,
                seat_status: row.seat_status,
                seat_type: row.seat_type
                // price: calculateTicketPrice(row.seat_type,)
            }))
        };

        res.json(postOut);
    } catch (error) {
        console.error("Error fetching seat data:", error);
        res.status(500).json({ error: "Failed to retrieve seat information" });
    }
};
