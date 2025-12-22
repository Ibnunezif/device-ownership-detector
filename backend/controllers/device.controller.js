import Device from "../models/device.model.js";
import mongoose from "mongoose";

const sampleObjectId = new mongoose.Types.ObjectId();

// POST /api/devices/register
// body: { device_type_id, brand, model, serial_number, color }
const registerDevice = async (req, res) => {
  try {
    const { device_type_id, brand, model, serial_number, color, barcode_data } =
      req.body;

    // 1. Validate input
    if (
      !device_type_id ||
      !brand ||
      !model ||
      !serial_number ||
      !color ||
      !barcode_data
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // 2. Check for existing device
    const isDeviceExist = await Device.findOne({ serial_number });
    if (isDeviceExist) {
      return res
        .status(409)
        .json({ success: false, message: "Device already registered" });
    }

    // 3. Upload photo to cloudinary if provided
    let devicePhotoUrl = "";
    if (req.file) {
      devicePhotoUrl = req.file.path;
    }

    console.log("Device Photo URL:", devicePhotoUrl);

    // 4. Create a new device
    const device = await Device.create({
      user_id: req.user._id,
      device_type_id: sampleObjectId,
      brand,
      model,
      serial_number,
      color,
      device_photo: devicePhotoUrl,
      barcode_data,
    });

    res.status(201).json({
      success: true,
      message: "Device registered successfully.",
      data: {
        deviceId: device._id,
        owner: req.user._id,
      },
      meta: {
        timestamp: device.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error registering device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default registerDevice;
