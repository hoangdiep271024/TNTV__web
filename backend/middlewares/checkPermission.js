import { verifyToken, isTokenExpired } from "./JWT.js";
import { systemConfig } from "../config/system.js";
import dotenv from "dotenv";
import connection from "../models/SQLConnection.js";
dotenv.config();

const SECRET_CODE = process.env.SECRET_CODE

export const checkPermisson = async (req, res, next) => {
    try {
//         // // buoc 1: nguoi dung dang nhap hay chua
//         // // let token = null;
//         // // if(req.session.user){
//         // //     token = req.cookies.jwt;
//         // // }
//         // // // buoc 2: kiem tra token
//         // // if(!token || isTokenExpired(token)){
//         // //     res.redirect("/auth/")
//         // // }
//         // if(!req.session||!req.session.user){
//         //     res.redirect("/auth/")
//         // }
//         // else{


//         // // // buoc 3: kiem tra quyen nguoi dung
//         // //     const token = req.cookies.jwt
//         // //     if(!token || isTokenExpired(token)){
//         // //             return res.status(404).json({
//         // //                 message: "loi token"
//         // //             })
//         // //         }
//         // //     const decoded = verifyToken(token);
//         // //     connection.query(`SELECT * from customers where id = ${decoded}`, (error, results, fields) => {
//         // //         if (results) {
//         // //             return res.status(404).json({
//         // //                 message: "loi user"
//         // //             })
//         // //         }
//         // //     })
//         // }
//         // if(!req.session||!req.session.user){
//         //     res.clearCookie("jwt");
//         //     res.clearCookie("user_name");
//         //     res.clearCookie("name");
//         //     res.clearCookie("phoneNumber");
//         //     res.clearCookie("address");
//         //     res.clearCookie("birthday");
//         //     res.clearCookie("sessionId")
//         //     res.render("index.html")
//         // }

        // Lấy token từ header Authorization
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                messages: "Unauthorized.Please login first!",
                success: false
            });
        }
        

        const token = authHeader.split(' ')[1]; // Tách 'Bearer' khỏi token
        const userId = verifyToken(token).id;

        // Nếu token expired hoặc không hợp lệ thì userId sẽ null
        if(!userId) {
            return res.status(401).json({
                messages: "Token is invalid.Please login first!",
                success: false
            });
        }
        if(isTokenExpired(token)){
            return res.status(401).json({
                messages: "Token is expired.Please login again!",
                success: false
            });
        }

        const [user] = await connection.promise().query(`SELECT * FROM users WHERE user_id = ?`, [userId])

        if (user.length == 0) {
            return res.status(401).json({
                messages: "Token is expired or invalid.Please login first!",
                success: false
            });
        }

        res.locals.user = user;

        next();
    } catch (error) {
        console.log(error);
        if (error.message === "TokenExpiredError") {
            return res.status(401).json({
                messages: "Token is expired. Please login again!",
                success: false
            });
        }
        return res.status(401).json({
            messages: "Invalid token. Please login again!",
            success: false
        });
    }
}