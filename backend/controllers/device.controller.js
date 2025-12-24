import Device from "../models/device.model.js";

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

    // 4. Create a new device
    const device = await Device.create({
      user_id: req.user._id,
      device_type_id,
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

// POST /api/devices/approve/:deviceId
// params: { deviceId }
const approveDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    // 1. Validate deviceId
    if (!deviceId) {
      return res
        .status(400)
        .json({ success: false, message: "Device ID is required" });
    }

    // 2. Role check
    if (req.user.role !== "security_chief") {
      return res.status(403).json({
        success: false,
        message: "Only security chief can approve devices",
      });
    }

    // 3. Find device
    const device = await Device.findById(deviceId);

    if (!device) {
      return res
        .status(404)
        .json({ success: false, message: "Device not found" });
    }

    // 4. Validate status
    if (device.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Device cannot be approved from status '${device.status}'`,
      });
    }

    // 5. Approve
    device.status = "approved";
    device.id_generated_by = req.user._id; // approved by user id

    await device.save();

    res.status(200).json({
      success: true,
      message: "Device approved successfully",
      device,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { registerDevice, approveDevice };
