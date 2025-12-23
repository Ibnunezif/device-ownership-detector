import express from "express";
import {loginUser,signupUser} from "../controllers/userController.js";

const router = express.Router()

//login router
router.post('/login',loginUser);

//signup router
router.post('/register',signupUser);

export default router;