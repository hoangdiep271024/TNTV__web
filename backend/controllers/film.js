import dotenv from "dotenv";
import connection from "../models/SQLConnection.js";

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

export const filmInfo = async (req,res) => {
    
}

