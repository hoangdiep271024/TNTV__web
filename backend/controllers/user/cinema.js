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

export const cinemaID = async(req, res) => {
    const cinemaId = req.params.cinema_id;
    const query = `SELECT 
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
    
where showtimes.show_date > now() and DATEDIFF(showtimes.show_date, NOW()) <= 5
and cinemas.cinema_id = ? `
    connection.query(query, [cinemaId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thực hiện truy vấn:', err);
            res.status(500).json({ error: 'Lỗi server' });
            return;
        }
        res.json(results); 
    });
}