import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { createJWT } from "../middlewares/JWT.js";
import connection from "../models/SQLConnection.js";
import { signInValidator } from "../validation/user.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE


const login = async (req, res) => {
    // dang nhap
    try {
        //Buoc1: validate data tu phia client
        const { error } = signInValidator.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            return res.json({
                message: error.details[0].message,
                success: false
            })
        }
        //Buoc2: kiem tra userName da ton tai hay chua
        connection.query(`SELECT * from users where username="${req.body.user__name}"`, async (error, results, fields) => {
            console.log(results)
            if (results.length === 0) {
                return res.status(404).json({
                    message: "username không tồn tại",
                    success: false
                })
            }
            const user = results?.[0];
            //Buoc3: kiem tra password
            const isMatch = await bcryptjs.compare(req.body.password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: "Mật khẩu không đúng",
                    success: false
                })
            }
            //Buoc4: Tao JWT
            let payload = {
                id: user.user_id,
            };
            const token = createJWT(payload);
            //Buoc6: tra ra thong bao cho nguoi dung
            req.session.user = {
                user_id: user.user_id,
            };
            res.cookie("jwt", token, { maxAge: 1000 * 60 * 30 })
            //.cookie("name", user.full_name, { maxAge: 1000 * 60 * 30 }).cookie("birthday", user.date_of_birth, { maxAge: 1000 * 60 * 30 }).cookie("phoneNumber", user.phone_number, { maxAge: 1000 * 60 * 30 }).cookie("address", user.address, { maxAge: 1000 * 60 * 30 });
            if (user.role === 0) {
                res.json({
                    message: "user",
                    success: true
                })
            }
            else {
                res.json({
                    message: "admin",
                    success: true
                })
            }

        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}

export default login;