import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import {updateUserValidator}  from "../validator/userValidator.js";
import deleteCloudinaryImage from "../utils/cloudinaryDelete.js";
import mongoose from "mongoose";

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



// PATCH /api/users/update/:id
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id || req.user._id;

    // 1️⃣ Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return handleError(res, 400, "Invalid user ID");
    }

    // 2️⃣ Find existing user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return handleError(res, 404, "User not found");
    }

    // 3️⃣ Check if body OR file exists
    const hasBodyFields = Object.keys(req.body).length > 0;
    const hasFile = !!req.file?.path;

    if (!hasBodyFields && !hasFile) {
      return handleError(res, 400, "Validation failed", {
        general: "At least one field must be updated",
      });
    }

    // 4️⃣ Validate body ONLY if body exists
    let validatedBody = {};
    if (hasBodyFields) {
      const { error, value } = updateUserValidator.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const validationErrors = error.details.reduce((acc, curr) => {
          acc[curr.path.join(".")] = curr.message;
          return acc;
        }, {});
        return handleError(res, 400, "Validation failed", validationErrors);
      }

      validatedBody = value;
    }

    // 5️⃣ Prepare update fields
    const updates = { ...validatedBody };

    // 6️⃣ If new profile picture uploaded → delete old one
    if (hasFile) {
      if (existingUser.profile_picture) {
        await deleteCloudinaryImage(existingUser.profile_picture);
      }
      updates.profile_picture = req.file.path;
    }

    // 7️⃣ Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password -__v");

    // 8️⃣ Success response
    return handleSuccess(res, 200, "Profile updated successfully", {
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return handleError(res, 500, "Failed to update profile");
  }
};



// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const { role, department, search } = req.query;

    const filter = {};

    if (role) filter.role = role;
    if (department) filter.department = department;

    if (search) {
      filter.$or = [
        { first_name: new RegExp(search, "i") },
        { last_name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const users = await User.find(filter)
      .select("-password -__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    return handleSuccess(res, 200, "Users fetched successfully", {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return handleError(res, 500, "Failed to fetch users");
  }
};

// GET /api/users/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password -__v");

    if (!user) {
      return handleError(res, 404, "User not found");
    }

    return handleSuccess(res, 200, "User profile fetched", {
      user,
    });
  } catch (error) {
    console.error("Get me error:", error);
    return handleError(res, 500, "Failed to fetch user profile");
  }
};





export { signupUser, loginUser,updateUser,getAllUsers,getMe };
