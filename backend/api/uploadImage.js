// import { v2 as cloudinary } from "cloudinary";
import cloudinaryModule from "cloudinary";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";

const cloudinary = cloudinaryModule.v2;
dotenv.config();
const routerUploadImage = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
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

routerUploadImage.post("/upload", upload.single("my_file"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
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