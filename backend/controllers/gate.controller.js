// controllers/gate.controller.js
import mongoose from "mongoose";
import Gate from "../Models/gatesModel.js";
import {
  gateCreateValidator,
  gateUpdateValidator,
} from "../validator/gateValidator.js";
import { handleSuccess, handleError } from "../utils/responseHandler.js";

/* =========================
   CREATE GATE
========================= */
const createGate = async (req, res) => {
  try {
    const { error, value } = gateCreateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", errors);
    }

    const { name, description, location } = value;

    const gate = await Gate.create({
      name,
      description,
      location,
      created_by: req.user._id,
    });

    await gate.populate({
      path: "created_by",
      select: "first_name last_name",
    });

    return handleSuccess(res, 201, "Gate created successfully", {
      gate: {
        id: gate._id,
        name: gate.name,
        description: gate.description,
        location: gate.location,
        createdBy: {
          id: gate.created_by._id,
          fullName: `${gate.created_by.first_name} ${gate.created_by.last_name}`,
        },
        createdAt: gate.createdAt,
        updatedAt: gate.updatedAt,
      },
    });
  } catch (error) {
    console.error("Create gate error:", error);
    return handleError(res, 500, "Something went wrong while creating gate");
  }
};

/* =========================
   UPDATE GATE
========================= */
const updateGate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return handleError(res, 400, "Invalid gate ID");

    const { error, value } = gateUpdateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", errors);
    }

    const gate = await Gate.findByIdAndUpdate(
      id,
      { $set: value },
      { new: true }
    ).populate({
      path: "created_by",
      select: "first_name last_name",
    });

    if (!gate) return handleError(res, 404, "Gate not found");

    return handleSuccess(res, 200, "Gate updated successfully", {
      gate: {
        id: gate._id,
        name: gate.name,
        description: gate.description,
        location: gate.location,
        createdBy: {
          id: gate.created_by._id,
          fullName: `${gate.created_by.first_name} ${gate.created_by.last_name}`,
        },
        createdAt: gate.createdAt,
        updatedAt: gate.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update gate error:", error);
    return handleError(res, 500, "Something went wrong while updating gate");
  }
};

/* =========================
   DELETE GATE
========================= */
const deleteGate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return handleError(res, 400, "Invalid gate ID");

    const gate = await Gate.findById(id);
    if (!gate) return handleError(res, 404, "Gate not found");

    // 🔐 If later you link gates to logs/devices, check here before deleting

    await gate.deleteOne();

    return handleSuccess(res, 200, "Gate deleted successfully");
  } catch (error) {
    console.error("Delete gate error:", error);
    return handleError(res, 500, "Something went wrong while deleting gate");
  }
};

/* =========================
   GET SINGLE GATE
========================= */
const getGate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return handleError(res, 400, "Invalid gate ID");

    const gate = await Gate.findById(id).populate({
      path: "created_by",
      select: "first_name last_name",
    });

    if (!gate) return handleError(res, 404, "Gate not found");

    return handleSuccess(res, 200, "Gate fetched successfully", {
      gate: {
        id: gate._id,
        name: gate.name,
        description: gate.description,
        location: gate.location,
        createdBy: {
          id: gate.created_by._id,
          fullName: `${gate.created_by.first_name} ${gate.created_by.last_name}`,
        },
        createdAt: gate.createdAt,
        updatedAt: gate.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get gate error:", error);
    return handleError(res, 500, "Something went wrong while fetching gate");
  }
};

/* =========================
   GET ALL GATES (PAGINATED)
========================= */
const getAllGates = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.name) filter.name = new RegExp(req.query.name, "i");
    if (req.query.location)
      filter.location = new RegExp(req.query.location, "i");

    const total = await Gate.countDocuments(filter);

    const gates = await Gate.find(filter)
      .populate({ path: "created_by", select: "first_name last_name" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return handleSuccess(res, 200, "Gates fetched successfully", {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      gates: gates.map((gate) => ({
        id: gate._id,
        name: gate.name,
        description: gate.description,
        location: gate.location,
        createdBy: {
          id: gate.created_by._id,
          fullName: `${gate.created_by.first_name} ${gate.created_by.last_name}`,
        },
        createdAt: gate.createdAt,
        updatedAt: gate.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get all gates error:", error);
    return handleError(res, 500, "Something went wrong while fetching gates");
  }
};

export {
  createGate,
  updateGate,
  deleteGate,
  getGate,
  getAllGates,
};
