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


export const newVietnam = async (req, res) => {  
    let query = `
    select news.new_id, news.new_header,news.new_img, news.new_time, news.new_footer , films.country, films.film_id
    from news
    left join films on films.film_id = news.film_id
    where films.country =1
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

export const newAboard = async (req, res) => {  
    let query = `
    select news.new_id, news.new_header,news.new_img, news.new_time, news.new_footer , films.country, films.film_id
    from news
    left join films on films.film_id = news.film_id
    where films.country =0
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