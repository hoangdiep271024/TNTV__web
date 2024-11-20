import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";
import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
dotenv.config();
export const likeCheck = async (req, res) => {
  const token = req.cookies.jwt;
 

  if (!token) {
    return res.json({
        message: "Người dùng chưa đăng nhập",
        liked: false
    })
}

if (isTokenExpired(token)) {
    res.json({
        message: "Người dùng hết phiên đăng nhập",
        liked: false
    })
}
    const decoded = verifyToken(token);
    const film_id = req.params.film_id
    let query = `
    SELECT * FROM user_like_film WHERE user_id = ? AND film_id = ?
    `;
    connection.query(query, [decoded.id, film_id], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length > 0) {
          res.json({ liked: true });
        } else {
          res.json({ liked: false });
        }
      });

}

