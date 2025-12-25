import express from "express";
import { signupUser, loginUser,updateUser,getAllUsers,getMe } from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import {multerErrorHandler} from "../middleware/multerErrorHandler.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";
const router = express.Router()

//login router
router.post('/login',loginUser);

//signup router
router.post('/register',upload.single("profile_picture"),multerErrorHandler,signupUser);

router.get("/me", requireAuth, getMe);

router.patch(
  "/update/:id",
  requireAuth,
  requireRole("security_chief"),
  upload.single("profile_picture"),
  multerErrorHandler,
  updateUser
);

router.get(
  "/",
  requireAuth,
  requireRole("admin", "security_chief"),
  getAllUsers
);


export default router;