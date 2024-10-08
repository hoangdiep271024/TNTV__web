import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import connection from '../models/SQLConnection.js';
dotenv.config();

export const forgotPassword = async (req, res) => {
    const jwt = req.cookies.jwt;
    if (!jwt) {
        return res.json({
            message: "Người dùng chưa đăng nhập",
            success: false
        })
    }

    if (isTokenExpired(jwt)) {
        res.json({
            message: "Người dùng hết phiên đăng nhập",
            success: false
        })
    }

    const decoded = verifyToken(jwt);

    // Tạo mã xác thực ngẫu nhiên
    const token = Math.floor(10000 + Math.random() * 90000).toString();
    const expireToken = new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' ');
    const hashedToken = await bcryptjs.hash(token, 11);


    // Truy vấn lấy email của người dùng
    const query = `SELECT email FROM users WHERE user_id = ?`;
    connection.query(query, [decoded.id], (err, results) => {
        if (err) return res.status(500).json({
            message: err.message,
            success: false
        });
        if (results.length === 0) return res.status(404).json({
            message: 'Không tìm thấy người dùng',
            success: false
        });

        const userEmail = results[0].email;

        // Cập nhật mã xác thực trong DB
        const updateQuery = `UPDATE users SET reset_token = ?, reset_token_expire = ? WHERE user_id = ?`;
        connection.query(updateQuery, [hashedToken, expireToken, decoded.id], (err) => {
            if (err) return res.status(500).json({
                message: err.message,
                success: false
            });

            // Sau khi cập nhật thành công, gửi email
            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: true,
                service: 'gmail',
                auth: {
                    user: process.env.MY_EMAIL,
                    pass: process.env.MY_EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.MY_EMAIL,
                to: userEmail,
                subject: 'Mã xác thực đặt lại mật khẩu',
                text: `Mã xác thực của bạn là: ${token}. Mã này sẽ hết hạn trong 1 giờ.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return res.status(500).json({
                    message: error.message,
                    success: false
                });
                return res.json({
                    message: 'Mã xác thực đã được gửi đến email của bạn!',
                    success: true
                });
            });
        });
    });
}

export const forgotPasswordCheck = async (req, res) => {
    const jwt = req.cookies.jwt;
    if (!jwt) {
        return res.json({
            message: "Người dùng chưa đăng nhập",
            success: false
        })
    }

    if (isTokenExpired(jwt)) {
        res.json({
            message: "Người dùng hết phiên đăng nhập",
            success: false
        })
    }

    const decoded = verifyToken(jwt);

    const query = `SELECT reset_token FROM users WHERE user_id = ?`;
    connection.query(query, [decoded.id], async (err, results) => {
        if (err) return res.status(500).json({
            message: err.message,
            success: false
        });
        const hashedToken = results[0].reset_token
        const isMatch = await bcryptjs.compare(req.body.token, hashedToken);
        if(!isMatch){
            res.json({
                message: "wrong",
                success: false
            })
        }
        res.json({
            message: "correct",
            success: true
        })
        })
}

