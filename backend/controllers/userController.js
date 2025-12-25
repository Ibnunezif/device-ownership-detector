import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { handleError, handleSuccess } from "../utils/responseHandler.js";

// create token
const createToken = (_id) => {
  if (!process.env.SECRET) {
    throw new Error("JWT secret is not defined in environment variables");
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Function to remove sensitive fields from user
const formatUser = (user) => {
  const { password, __v, ...userData } = user.toObject();
  return userData;
};

// LOGIN CONTROLLER
const loginUser = async (req, res) => {
  try {
    const user = await User.login(req.body); // pass full body for Joi validation
    const token = createToken(user._id);
    return handleSuccess(res, 200, "Login successful", {
      user: formatUser(user),
      token
    });
  } catch (error) {
    if (error.isJoi) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }
    return handleError(res, 400, error.message);
  }
};

// SIGNUP CONTROLLER
const signupUser = async (req, res) => {
  try {
    // Get profile picture URL from Cloudinary (if uploaded)
    const profilePictureUrl = req.file?.path || null;

    const user = await User.signup(req.body, profilePictureUrl);

    const token = createToken(user._id);

    return handleSuccess(res, 201, "Signup successful", {
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        university_id: user.university_id,
        department: user.department,
        batch: user.batch,
        role: user.role,
        email: user.email,
        profile_picture: user.profile_picture, // ✅ returned
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    if (error.isJoi) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    return handleError(res, 400, error.message);
  }
};


export { signupUser, loginUser };
