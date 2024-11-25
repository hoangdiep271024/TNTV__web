import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";
dotenv.config();
export const filmNew = async (req, res) => {  
    let query = `
    SELECT * from news
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        return res.json(results);
    });
};
