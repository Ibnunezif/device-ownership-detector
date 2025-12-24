import Device from "../Models/device.model.js";

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

// POST /api/devices/flag/:id
// body: { status }
// Allowed: 'stolen' (note: 'lost' not supported by current schema enum)
// Access: security_chief only
export const flagDeviceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user missing" });
    }
    if (req.user.role !== "security_chief") {
      return res.status(403).json({
        success: false,
        message: "Only security chief can flag devices",
      });
    }

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "status is required ('stolen')" });
    }

    // The schema enum supports: pending, approved, stolen, blocked
    // 'lost' is not defined in the current schema; reject it to avoid validation errors
    if (!["stolen"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Unsupported status for flagging with current schema. Use 'stolen'.",
      });
    }

    const device = await Device.findById(id);
    if (!device) {
      return res
        .status(404)
        .json({ success: false, message: "Device not found" });
    }

    device.status = status;
    // Reuse id_generated_by to store the user who performed the flagging
    device.id_generated_by = req.user._id;
    await device.save();

    return res.status(200).json({
      success: true,
      message: `Device flagged as '${status}'`,
      device,
    });
  } catch (error) {
    console.error("Flag device failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to flag device",
      error: error.message,
    });
  }
};

// GET /api/devices/flagged?q=... (barcode or serial)
// Access: security_staff | security_chief
export const getFlaggedDevices = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user missing" });
    }
    const allowed = ["security_staff", "security_chief"];
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { q } = req.query;
    const search = [];
    if (q) {
      const regex = new RegExp(q, "i");
      search.push({ barcode_data: regex });
      search.push({ serial_number: regex });
    }

    // Include both 'stolen' and 'lost' in search to be future-proof
    const statusFilter = { status: { $in: ["stolen", "lost"] } };
    const filter = q ? { $and: [statusFilter, { $or: search }] } : statusFilter;

    const devices = await Device.find(filter);
    return res.json({ success: true, devices });
  } catch (error) {
    console.error("Fetch flagged devices failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch flagged devices",
      error: error.message,
    });
  }
};

export { registerDevice, approveDevice, getFlaggedDevices, flagDeviceStatus };
