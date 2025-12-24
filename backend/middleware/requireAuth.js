import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { handleError } from "../utils/responseHandler.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // No token provided
  if (!authorization) {
    return handleError(
      res,
      401,
      "Please log in to continue"
    );
  }

  // Invalid format
  if (!authorization.startsWith("Bearer ")) {
    return handleError(
      res,
      401,
      "Please log in again"
    );
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(_id).select("_id role email");

    if (!user) {
      return handleError(
        res,
        401,
        "Your session is no longer valid. Please log in again"
      );
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth error:", error);

    // Expired token
    if (error.name === "TokenExpiredError") {
      return handleError(
        res,
        401,
        "Your session has expired. Please log in again"
      );
    }

    // Invalid token or any JWT issue
    return handleError(
      res,
      401,
      "Please log in again"
    );
  }
};

export default requireAuth;
