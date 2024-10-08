import dotenv from 'dotenv';
import { isTokenExpired, verifyToken } from '../middlewares/JWT.js';
import connection from '../models/SQLConnection.js';
dotenv.config();
export const userInfo = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        if (isTokenExpired(token)) {
            res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);
        
        const [userInfo] = await connection.promise().query(
            `SELECT user_img,email,phone_number,full_name,sex,date_of_birth from users where user_id="${decoded.id}"`
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

export const userInfoUpdate = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);

        if (isTokenExpired(token)) {
            res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }
        const [userInfo] = await connection.promise().query(
            `UPDATE users
            SET full_name = '${req.body.name}', phone_number = '${req.body.phone__number}', email = '${req.body.gmail}'
            WHERE user_id="${decoded.id}"`
        );

        return res.json({
            message: "cập nhật thành công",
            success: true
        })

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}