import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";
dotenv.config();

export const actor = async (req, res) => {
    const actor_id = req.params.actor_id;
    let query = `
    SELECT 
        actors.actor_id, 
        actors.actor_name, 
        actors.actor_img, 
        actors.actor_describe, 
        GROUP_CONCAT(actor_film.film_id) AS film_ids 
    FROM 
        actors 
    INNER JOIN 
        actor_film ON actor_film.actor_id = actors.actor_id
    WHERE 
        actors.actor_id = ?
    GROUP BY 
        actors.actor_id
    `;

    connection.query(query, [actor_id], (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.json(results);  
    });
};
