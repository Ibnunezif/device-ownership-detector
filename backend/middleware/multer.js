// middlewares/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_uploads", // my cloudinary folder name to store uploads
    allowed_formats: ["jpg", "png", "jpeg"], // allowed file types
  },
});

const upload = multer({ storage });

export default upload;
