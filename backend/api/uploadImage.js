// import { v2 as cloudinary } from "cloudinary";
import cloudinaryModule from "cloudinary";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import { isTokenExpired, verifyToken } from "../middlewares/JWT.js";
import connection from "../models/SQLConnection.js";

const cloudinary = cloudinaryModule.v2;
dotenv.config();
const routerUploadImage = express.Router()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}

const storage = new multer.memoryStorage();
const upload = multer({
    storage,
});

routerUploadImage.post("/", upload.single("image"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);

        const token = req.cookies.jwt;
        if(!token) {
            res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            });
        }
        if(isTokenExpired(token)){
            res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            });
        }

        const decode = verifyToken(token);
        const results = await connection.promise().query(`UPDATE users set user_img = '${cldRes.url}' where user_id = '${decode.id}'`)
        console.log(cldRes.url)
        res.json({
            message: cldRes,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: error.message,
            success: false
        });
    }
});

export default routerUploadImage;