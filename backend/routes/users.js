import express from "express";
import {loginUser,signupUser} from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import {multerErrorHandler} from "../middleware/multerErrorHandler.js";

const router = express.Router()

//login router
router.post('/login',loginUser);

//signup router
router.post('/register',upload.single("profile_picture"),multerErrorHandler,signupUser);

export default router;