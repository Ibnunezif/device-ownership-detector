import mongoose from "mongoose";
import DeviceType from "../models/deviceTypeModel.js";
import Device from "../models/device.model.js";
import {
  deviceTypeCreateValidator,
  deviceTypeUpdateValidator,
} from "../validator/deviceTypeValidator.js";
import { handleSuccess, handleError } from "../utils/responseHandler.js";

// CREATE DEVICE TYPE
const createDeviceType = async (req, res) => {
  try {
    const { error, value } = deviceTypeCreateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    const { name, description } = value;

    const deviceType = await DeviceType.create({
      name,
      description,
      created_by: req.user._id,
    });

    await deviceType.populate({ path: "created_by", select: "first_name last_name" });

    return handleSuccess(res, 201, "Device type created successfully", {
      deviceType: {
        id: deviceType._id,
        name: deviceType.name,
        description: deviceType.description,
        createdBy: {
          id: deviceType.created_by._id,
          fullName: `${deviceType.created_by.first_name} ${deviceType.created_by.last_name}`,
        },
        createdAt: deviceType.createdAt,
        updatedAt: deviceType.updatedAt,
      },
    });
  } catch (error) {
    console.error("Create device type error:", error);
    return handleError(res, 500, "Something went wrong while creating device type");
  }
};

// UPDATE DEVICE TYPE
const updateDeviceType = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return handleError(res, 400, "Invalid ID");

    const { error, value } = deviceTypeUpdateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    const updatedDeviceType = await DeviceType.findByIdAndUpdate(
      id,
      { $set: value },
      { new: true }
    ).populate({ path: "created_by", select: "first_name last_name" });

    if (!updatedDeviceType) return handleError(res, 404, "Device type not found");

    return handleSuccess(res, 200, "Device type updated successfully", {
      deviceType: {
        id: updatedDeviceType._id,
        name: updatedDeviceType.name,
        description: updatedDeviceType.description,
        createdBy: updatedDeviceType.created_by
          ? {
              id: updatedDeviceType.created_by._id,
              fullName: `${updatedDeviceType.created_by.first_name} ${updatedDeviceType.created_by.last_name}`,
            }
          : null,
        createdAt: updatedDeviceType.createdAt,
        updatedAt: updatedDeviceType.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update device type error:", error);
    return handleError(res, 500, "Something went wrong while updating device type");
  }
};

// DELETE DEVICE TYPE
const deleteDeviceType = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
      return handleError(res, 400, "Invalid ID");

    const deviceType = await DeviceType.findById(id);
    if (!deviceType) 
      return handleError(res, 404, "Device type not found");

    // Check if any device is using this type
    const connectedDevice = await Device.findOne({ device_type_id: id });
    if (connectedDevice) {
      return handleError(
        res,
        400,
        "Cannot delete device type. One or more devices are associated with it."
      );
    }

    // Safe to delete
    await deviceType.deleteOne();

    return handleSuccess(res, 200, "Device type deleted successfully");
  } catch (error) {
    console.error("Delete device type error:", error);
    return handleError(res, 500, "Something went wrong while deleting device type");
  }
};


// GET SINGLE DEVICE TYPE
const getDeviceType = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return handleError(res, 400, "Invalid ID");

    const deviceType = await DeviceType.findById(id).populate({
      path: "created_by",
      select: "first_name last_name",
    });

    if (!deviceType) return handleError(res, 404, "Device type not found");

    return handleSuccess(res, 200, "Device type fetched successfully", {
      deviceType: {
        id: deviceType._id,
        name: deviceType.name,
        description: deviceType.description,
        createdBy: deviceType.created_by
          ? {
              id: deviceType.created_by._id,
              fullName: `${deviceType.created_by.first_name} ${deviceType.created_by.last_name}`,
            }
          : null,
        createdAt: deviceType.createdAt,
        updatedAt: deviceType.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get device type error:", error);
    return handleError(res, 500, "Something went wrong while fetching device type");
  }
};

// GET ALL DEVICE TYPES (paginated)
const getAllDeviceTypes = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.name) filter.name = new RegExp(req.query.name, "i");

    const total = await DeviceType.countDocuments(filter);

    let deviceTypes = await DeviceType.find(filter)
      .populate({ path: "created_by", select: "first_name last_name" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return handleSuccess(res, 200, "Device types fetched successfully", {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      deviceTypes: deviceTypes.map((dt) => ({
        id: dt._id,
        name: dt.name,
        description: dt.description,
        createdBy: dt.created_by
          ? {
              id: dt.created_by._id,
              fullName: `${dt.created_by.first_name} ${dt.created_by.last_name}`,
            }
          : null,
        createdAt: dt.createdAt,
        updatedAt: dt.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get all device types error:", error);
    return handleError(res, 500, "Something went wrong while fetching device types");
  }
};

export {
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
  getDeviceType,
  getAllDeviceTypes,
};
