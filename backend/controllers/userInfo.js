import dotenv from 'dotenv';
import { isTokenExpired, verifyToken } from '../middlewares/JWT.js';
import connection from '../models/SQLConnection.js';
dotenv.config();
const userInfo = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);

        if(isTokenExpired(token)){
            res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }

        const [userInfo] = await connection.promise().query(
            `SELECT username,user_img,email,phone_number,full_name,sex,date_of_birth from users where user_id="${decoded.id}"`
        );

        if (userInfo.length === 0) {
            return res.status(500).json({
                message: "user không tồn tại",
                success: false
            });
        }

        res.json({
            userInfo: userInfo,
            success: true
        })

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}

export default userInfo