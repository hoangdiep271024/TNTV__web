import dotenv from "dotenv";
import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
import connection from "../../models/SQLConnection.js";
dotenv.config();
export const likeCheck = async (req, res) => {
  const token = req.body.jwt;

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

export const unLike = async (req, res) => {
  const token = req.body.jwt;

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
    DELETE FROM user_like_film WHERE user_id = ? AND film_id = ?
    `;
    connection.query(query, [decoded.id, film_id], (error, results) => {
      if (error) {
        console.error('Error in DELETE query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    
      if (results.affectedRows > 0) {
        res.json({
          message: "Bỏ like thành công",
          liked: false,
        });
      } else {
        res.json({
          message: "Không tìm thấy bản ghi để xoá",
          liked: true, 
        });
      }
    });

}

export const Like = async (req, res) => {
  const token = req.body.jwt;

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
    INSERT INTO user_like_film (user_id, film_id) VALUES (?, ?);
    `;
    connection.query(query, [decoded.id, film_id], (error, results) => {
    if (error) {
      console.error('Error inserting like:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ 
      message: "Liked successfully", 
      liked: true 
    });})

}

