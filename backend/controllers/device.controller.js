import Device from "../models/device.model.js";
import { createDeviceValidator } from "../validator/deviceValidator.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";

// POST /api/devices/register
const registerDevice = async (req, res) => {
  try {
    // 1️ Validate input with Joi
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
      device_type_id,
      brand,
      model,
      serial_number,
      color,
      barcode_data,
    } = value;

    // 2️ Check if device already exists
    const existingDevice = await Device.findOne({ serial_number });
    if (existingDevice) {
      return handleError(res, 409, "This device is already registered");
    }

    // 3️ Handle device photo (Cloudinary)
    let devicePhotoUrl = "";
    if (req.file?.path) {
      devicePhotoUrl = req.file.path;
    }else{
      return handleError(res, 400, "Device photo is required");
    }

    // 4️ Create device
    const device = await Device.create({
      user_id: req.user._id,
      device_type_id,
      brand,
      model,
      serial_number,
      color,
      barcode_data,
      device_photo: devicePhotoUrl,
    });

    // 5️ Success response with device_photo
    return handleSuccess(res, 201, "Device registered successfully", {
      device: {
        id: device._id,
        brand: device.brand,
        model: device.model,
        serial_number: device.serial_number,
        status: device.status,
        device_photo: device.device_photo || null, // Include profile picture if exists
      },
      owner: {
        id: req.user._id,
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

export default registerDevice;
