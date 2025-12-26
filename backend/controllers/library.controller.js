import mongoose from "mongoose";
import Library from "../models/librariesModel.js"
import { handleSuccess, handleError } from "../utils/responseHandler.js";
import {
  libraryCreateValidator,
  libraryUpdateValidator,
} from "../validator/libraryValidator.js";

/* ============================
   CREATE LIBRARY
============================ */
const createLibrary = async (req, res) => {
  try {
    const { error, value } = libraryCreateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    const { name, description, location } = value;

    const library = await Library.create({
      name,
      description,
      location,
      created_by: req.user._id,
    });

    await library.populate({
      path: "created_by",
      select: "first_name last_name",
    });

    return handleSuccess(res, 201, "Library created successfully", {
      library: {
        id: library._id,
        name: library.name,
        description: library.description,
        location: library.location,
        createdBy: {
          id: library.created_by._id,
          fullName: `${library.created_by.first_name} ${library.created_by.last_name}`,
        },
        createdAt: library.createdAt,
        updatedAt: library.updatedAt,
      },
    });
  } catch (error) {
    console.error("Create library error:", error);
    return handleError(res, 500, "Something went wrong while creating library");
  }
};

/* ============================
   UPDATE LIBRARY
============================ */
const updateLibrary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(res, 400, "Invalid library ID");
    }

    const { error, value } = libraryUpdateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    const library = await Library.findByIdAndUpdate(
      id,
      { $set: value },
      { new: true }
    ).populate({
      path: "created_by",
      select: "first_name last_name",
    });

    if (!library) {
      return handleError(res, 404, "Library not found");
    }

    return handleSuccess(res, 200, "Library updated successfully", {
      library: {
        id: library._id,
        name: library.name,
        description: library.description,
        location: library.location,
        createdBy: library.created_by
          ? {
              id: library.created_by._id,
              fullName: `${library.created_by.first_name} ${library.created_by.last_name}`,
            }
          : null,
        createdAt: library.createdAt,
        updatedAt: library.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update library error:", error);
    return handleError(res, 500, "Something went wrong while updating library");
  }
};

/* ============================
   DELETE LIBRARY
============================ */
const deleteLibrary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(res, 400, "Invalid library ID");
    }

    const library = await Library.findById(id);
    if (!library) {
      return handleError(res, 404, "Library not found");
    }

    await library.deleteOne();

    return handleSuccess(res, 200, "Library deleted successfully");
  } catch (error) {
    console.error("Delete library error:", error);
    return handleError(res, 500, "Something went wrong while deleting library");
  }
};

/* ============================
   GET SINGLE LIBRARY
============================ */
const getLibrary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(res, 400, "Invalid library ID");
    }

    const library = await Library.findById(id).populate({
      path: "created_by",
      select: "first_name last_name",
    });

    if (!library) {
      return handleError(res, 404, "Library not found");
    }

    return handleSuccess(res, 200, "Library fetched successfully", {
      library: {
        id: library._id,
        name: library.name,
        description: library.description,
        location: library.location,
        createdBy: library.created_by
          ? {
              id: library.created_by._id,
              fullName: `${library.created_by.first_name} ${library.created_by.last_name}`,
            }
          : null,
        createdAt: library.createdAt,
        updatedAt: library.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get library error:", error);
    return handleError(res, 500, "Something went wrong while fetching library");
  }
};

/* ============================
   GET ALL LIBRARIES (PAGINATED)
============================ */
const getAllLibraries = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.name) {
      filter.name = new RegExp(req.query.name, "i");
    }
    if (req.query.location) {
      filter.location = new RegExp(req.query.location, "i");
    }

    const total = await Library.countDocuments(filter);

    const libraries = await Library.find(filter)
      .populate({ path: "created_by", select: "first_name last_name" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return handleSuccess(res, 200, "Libraries fetched successfully", {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      libraries: libraries.map((lib) => ({
        id: lib._id,
        name: lib.name,
        description: lib.description,
        location: lib.location,
        createdBy: lib.created_by
          ? {
              id: lib.created_by._id,
              fullName: `${lib.created_by.first_name} ${lib.created_by.last_name}`,
            }
          : null,
        createdAt: lib.createdAt,
        updatedAt: lib.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get all libraries error:", error);
    return handleError(res, 500, "Something went wrong while fetching libraries");
  }
};

export {
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibrary,
  getAllLibraries,
};
