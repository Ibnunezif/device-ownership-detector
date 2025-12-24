// middlewares/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_uploads",           // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file types
    transformation: [
      { width: 1000, height: 1000, crop: "limit", quality: "auto" } // Resize & optimize
    ],
  },
});

// Configure multer
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 2 MB max file size
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  }
});

export default upload;
