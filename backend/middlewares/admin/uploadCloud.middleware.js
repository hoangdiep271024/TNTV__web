import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadSingle = (req, res, next) => {
  if(req.file) {
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    }
    const uploadToCloudinary = async (buffer) => {
      const result = await streamUpload(buffer);
      req.body[req.file.fieldname] = result.url;
      next();
    }
    uploadToCloudinary(req.file.buffer);
  } else {
    next();
  }
}