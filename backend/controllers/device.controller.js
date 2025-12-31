import Device from "../models/device.model.js";
import { createDeviceValidator, updateDeviceValidator } from "../validator/deviceValidator.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";
import deleteCloudinaryImage from "../utils/cloudinaryDelete.js";
import mongoose from "mongoose";
import DeviceType from "../models/deviceTypeModel.js"; 
import User from "../models/userModel.js";


// POST /api/devices/register
const registerDevice = async (req, res) => {
  try {
    // 1️⃣ Validate input with Joi
    const { error, value } = createDeviceValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    const {
      user_id,
      device_type_id,
      brand,
      model,
      serial_number,
      color,
    } = value;

    const deviceOwner = await User.findById(user_id);
    if (!deviceOwner) {
      return handleError(res, 404, "User not found");
    }

    // 2️⃣ Check if device type exists
    const deviceTypeExists = await DeviceType.findById(device_type_id);
    if (!deviceTypeExists) {
      return handleError(res, 404, "Device type not found");
    }

    // 3️⃣ Check if device already exists
    const existingDevice = await Device.findOne({ serial_number });
    if (existingDevice) {
      return handleError(res, 409, "This device is already registered");
    }

    // 4️⃣ Handle device photo (Cloudinary)
    let devicePhotoUrl = "";
    if (req.file?.path) {
      devicePhotoUrl = req.file.path;
    } else {
      return handleError(res, 400, "Device photo is required");
    }

    const barcode_data = deviceOwner.university_id +user_id+serial_number;

    // 5️⃣ Create device
    const device = await Device.create({
      user_id: user_id,
      device_type_id,
      brand,
      model,
      serial_number,
      color,
      barcode_data,
      device_photo: devicePhotoUrl,
    });

    // 6️⃣ Success response
    return handleSuccess(res, 201, "Device registered successfully", {
      device: {
        id: device._id,
        brand: device.brand,
        model: device.model,
        serial_number: device.serial_number,
        status: device.status,
        barcode_data: device.barcode_data,
        device_photo: device.device_photo || null,
      },
      owner: {
        id: user_id,
        name: deviceOwner.first_name + " " + deviceOwner.last_name,
      },
      meta: {
        createdAt: device.createdAt,
      },
    });
  } catch (error) {
    console.error("Register device error:", error);
    return handleError(
      res,
      500,
      "Something went wrong while registering the device"
    );
  }
};

// PATCH /api/devices/update/:id
const deviceUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(res, 400, "Invalid device ID");
    }

    // 1️⃣ Validate input
    const { error, value } = updateDeviceValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    // 2️⃣ Find existing device
    const device = await Device.findById(id);
    if (!device) {
      return handleError(res, 404, "Device not found");
    }

    // 3️⃣ Prepare update fields
    const updatedFields = { ...value };

    // 4️⃣ If new image uploaded → delete old image
    if (req.file?.path) {
      if (device.device_photo) {
        await deleteCloudinaryImage(device.device_photo);
      }
      updatedFields.device_photo = req.file.path;
    }

    // 5️⃣ Update device
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    // 6️⃣ Success response
    return handleSuccess(res, 200, "Device updated successfully", {
      device: {
        id: updatedDevice._id,
        brand: updatedDevice.brand,
        model: updatedDevice.model,
        serial_number: updatedDevice.serial_number,
        color: updatedDevice.color,
        status: updatedDevice.status,
        device_photo: updatedDevice.device_photo || null,
      },
      owner: {
        id: updatedDevice.user_id,
        name : updatedDevice.user_id.first_name + " " + updatedDevice.user_id.last_name,
      },
      meta: {
        updatedAt: updatedDevice.updatedAt,
      },
    });
  } catch (error) {
    console.error("Device update error:", error);
    return handleError(res, 500, "Something went wrong while updating the device");
  }
};

// GET /api/devices
const getAllDevices = async (req, res) => {
  try {
    // Pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // Filters
    const {
      status,
      model,
      brand,
      department,
      serial_number,
      search,
      university_id, // new
    } = req.query;

    const filter = {};

    // Device-level filters
    if (status) filter.status = status;
    if (model) filter.model = new RegExp(model, "i");
    if (brand) filter.brand = new RegExp(brand, "i");
    if (serial_number) filter.serial_number = serial_number;

    // Search across multiple fields
    if (search) {
      filter.$or = [
        { model: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { serial_number: new RegExp(search, "i") },
      ];
    }

    // If university_id is provided, find the user first
    let userFilter = {};
    if (university_id) {
      const user = await User.findOne({ university_id });
      if (!user) {
        return handleError(res, 404, "User not found");
      }
      userFilter.user_id = user._id;
    }

    // Merge filters
    const finalFilter = { ...filter, ...userFilter };

    // Query
    let devices = await Device.find(finalFilter)
      .populate({
        path: "user_id",
        select: "first_name last_name email department university_id profile_picture",
        ...(department && { match: { department } }),
      })
      .populate({
        path: "device_type_id",
        select: "name",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Remove devices whose user didn't match department filter
    if (department) {
      devices = devices.filter((d) => d.user_id !== null);
    }

    // Total count for pagination
    const total = await Device.countDocuments(finalFilter);

    // Success response
    return handleSuccess(res, 200, "Devices fetched successfully", {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      devices: devices.map((device) => ({
        id: device._id,
        brand: device.brand,
        model: device.model,
        serial_number: device.serial_number,
        status: device.status,
        barcode: device.barcode_data || null, // added barcode
        device_photo: device.device_photo || null,
        owner: device.user_id
          ? {
              id: device.user_id._id,
              name: `${device.user_id.first_name} ${device.user_id.last_name}`,
              email: device.user_id.email,
              department: device.user_id.department,
              university_id: device.user_id.university_id,
              image: device.user_id.profile_picture || null,
            }
          : null,
        device_type: device.device_type_id?.name || null,
        createdAt: device.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get devices error:", error);
    return handleError(res, 500, "Failed to fetch devices");
  }
};

// GET /api/my-devices
const getMyDevices = async (req, res) => {
  try {
    // Require logged-in user
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return handleError(res, 401, "Unauthorized – user not logged in");
    }

    // Pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // Filters
    const { status, model, brand, serial_number, search } = req.query;

    const filter = { user_id: userId }; // ← KEY LINE

    if (status) filter.status = status;
    if (model) filter.model = new RegExp(model, "i");
    if (brand) filter.brand = new RegExp(brand, "i");
    if (serial_number) filter.serial_number = serial_number;

    if (search) {
      filter.$or = [
        { model: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { serial_number: new RegExp(search, "i") },
      ];
    }

    // Query
    const devices = await Device.find(filter)
      .populate({
        path: "user_id",
        select:
          "first_name last_name email department university_id profile_picture",
      })
      .populate({
        path: "device_type_id",
        select: "name",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count for pagination
    const total = await Device.countDocuments(filter);

    return handleSuccess(res, 200, "My devices fetched successfully", {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      devices: devices.map((device) => ({
        id: device._id,
        brand: device.brand,
        model: device.model,
        serial_number: device.serial_number,
        status: device.status,
        barcode: device.barcode_data || null,
        device_photo: device.device_photo || null,
        owner: device.user_id
          ? {
              id: device.user_id._id,
              name: `${device.user_id.first_name} ${device.user_id.last_name}`,
              email: device.user_id.email,
              department: device.user_id.department,
              university_id: device.user_id.university_id,
              image: device.user_id.profile_picture || null,
            }
          : null,
        device_type: device.device_type_id?.name || null,
        createdAt: device.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get my devices error:", error);
    return handleError(res, 500, "Failed to fetch devices");
  }
};




// DELETE /api/devices/:id
const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(res, 400, "Invalid device ID");
    }

    // 1️ Find device
    const device = await Device.findById(id);
    if (!device) {
      return handleError(res, 404, "Device not found");
    }

    // 2️ Delete image from Cloudinary
    if (device.device_photo) {
      await deleteCloudinaryImage(device.device_photo);
    }

    // 3️ Delete device from DB
    await device.deleteOne();

    // 4️ Success response
    return handleSuccess(res, 200, "Device deleted successfully");
  } catch (error) {
    console.error("Delete device error:", error);
    return handleError(res, 500, "Something went wrong while deleting device");
  }
};

const getDataForPDF = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate device ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleError(res, 400, "Invalid device ID");
    }

    // Find device by ID, populate user and device type
    const device = await Device.findById(id)
      .populate("user_id")         // populate user
      .populate("device_type_id"); // populate device type

    if (!device) {
      return handleError(res, 404, "Device not found");
    }

    const user = device.user_id || {};

    // Prepare data to return
    const data = {
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      university_id: user.university_id || "",
      image_of_user: user.image || "",

      device_type_name: device.device_type_id?.name || "",
      device_brand: device.brand || "",
      device_model: device.model || "",
      device_color: device.color || "",
      device_serial_number: device.serial_number || "",
      image_of_device: device.device_photo || "",
      barcode: device.barcode_data || "",
    };
    return handleSuccess(res, 200, "Devices fetched successfully",data);
  } catch (error) {
    console.error("Generate PDF error:", error);
    return handleError(res, 500, "Something went wrong while fetching device data");
  }
};




export {registerDevice,deviceUpdate,getAllDevices,deleteDevice,getDataForPDF,getMyDevices};
