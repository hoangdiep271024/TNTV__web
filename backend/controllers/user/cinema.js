import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";

dotenv.config();
export const cinema = async(req,res)=>{
    const regionId = req.params.region_id;
    const query = `
    select cinemas.cinema_id, cinemas.cinema_name, cinemas.address, regions.region_name, cinema_clusters.cluster_name,regions.region_id
    from cinemas
    inner join regions on cinemas.region_id = regions.region_id
    inner join cinema_clusters on cinemas.cluster_id = cinema_clusters.cluster_id
    where cinemas.region_id = ?
    `;
    connection.query(query, [regionId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thực hiện truy vấn:', err);
            res.status(500).json({ error: 'Lỗi server' });
            return;
        }
        res.json(results); // Trả về kết quả dưới dạng JSON
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Array of weekday names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Format the date to "Sun 17/11/2024"
    const dayName = days[date.getUTCDay()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();

    return `${dayName} ${day}/${month}/${year}`;
}

export const cinemaID = async (req, res) => {
    const cinemaId = req.params.cinema_id;
    const query = `
    SELECT 
        films.film_name, 
        films.film_img, 
        cinemas.cinema_id, 
        cinemas.cinema_name, 
        cinemas.address, 
        showtimes.showtime_id, 
        showtimes.show_date, 
        showtimes.show_time
    FROM 
        films
    INNER JOIN 
        showtimes ON films.film_id = showtimes.film_id
    INNER JOIN 
        cinemas ON cinemas.cinema_id = showtimes.cinema_id
    WHERE 
        showtimes.show_date > NOW() 
        AND DATEDIFF(showtimes.show_date, NOW()) <= 5
        AND cinemas.cinema_id = ?
    `;
    
    connection.query(query, [cinemaId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        const time = {};
         
        results.forEach(row => {
            const { show_date, show_time, film_name, film_img} = row;
            
            if (!time[formatDate(show_date)]) {
                time[formatDate(show_date)] = [];
            }

            time[formatDate(show_date)].push({
                showtime_id: row.showtime_id,
                show_time,
                film: {
                    film_name,
                    film_img
                },
            });
        });

        res.json(time);
    });
};
