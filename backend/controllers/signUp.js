import dotenv from "dotenv";
import { singUpValidator } from "../validation/user.js";
dotenv.config()
const SECRET_CODE = process.env.SECRET_CODE

const signUp = async (req, res) => {
    // kiem tra dang ki
    try {
        // buoc 1 validate du lieu
        const { error } = singUpValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.json({
                message: error.details[0].message,
                success: false
            })
        }
        // kiem tra nguoi dung da ton tai chua
        connection.query(`SELECT user_name from customers where username="${req.body.user__name}"`, (error, results, fields) => {
            const userExisted = results[0];
            if (userExisted) {
                return res.json({
                    message: "username đã tồn tại",
                    success: false
                })
            }
        })
        // kiem tra so dien thoai da ton tai chua
        connection.query(`SELECT phone from customers where phone_number="${req.body.phone__number}"`, (error, results, fields) => {
            const userExisted = results[0];
            if (userExisted) {
                return res.json({
                    message: "số điện thoại đã tồn tại",
                    success: false
                })
            }
        })
        // kiem tra email da ton tai chua
        connection.query(`SELECT email from customers where email="${req.body.gmail}"`, (error, results, fields) => {
            const userExisted = results[0];
            if (userExisted) {
                return res.json({
                    message: "gmail đã tồn tại",
                    success: false
                })
            }
        })

        // ma hoa mat khau
        const hashedPassword = await bcryptjs.hash(req.body.password, 11)

        // them nguoi dung vao database
        connection.query(`Insert into customers(full_name,phone_number,email,date_of_birth,password,username) value("${req.body.name}","${req.body.phone__number}","${req.body.gmail}","${req.body.birthday}","${hashedPassword}","${req.body.user__name}")`, (error, results, fields) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                return res.status(404).json({
                    message: "error",
                    success: false
                })
            }
        })
        // buoc 5 thong bao dang ki thanh cong
        // xoa mat khau di
        req.body.password = undefined
        res.json({
            message: "đăng kí thành công",
            success: true
        })
    } catch (error) {
        console.log(error.message)
    }
}


export default signUp