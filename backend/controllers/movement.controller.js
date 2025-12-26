import mongoose from "mongoose";
import Device from "../models/device.model.js";
import User from "../models/userModel.js";
import Gate from "../Models/gatesModel.js";
import Movement from "../Models/movementModel.js";
import Library from "../Models/librariesModel.js";
import { scanDeviceValidator } from "../validator/movementValidator.js";
import { handleSuccess, handleError } from "../utils/responseHandler.js";

// SCAN DEVICE & LOG MOVEMENT
const scanDevice = async (req, res) => {
  try {
    /* 1️⃣ Validate request */
    const { error, value } = scanDeviceValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path.join(".")] = curr.message;
        return acc;
      }, {});
      return handleError(res, 400, "Validation failed", validationErrors);
    }

    const { barcode, gate_id, scan_method } = value;

    /* 2️⃣ Validate gate */
    if (!mongoose.Types.ObjectId.isValid(gate_id)) {
      return handleError(res, 400, "Invalid gate ID");
    }

    const gate = await Gate.findById(gate_id)
      .select("name location")
      .lean();

    if (!gate) {
      return handleError(res, 404, "Gate not found");
    }

    /* 3️⃣ Find device by barcode */
    const device = await Device.findOne({ barcode_data: barcode })
      .select(
        "_id brand model color serial_number device_photo user_id status"
      )
      .lean();

    if (!device) {
      return handleError(res, 404, "Device not found");
    }

    /* 4️⃣ Find device owner */
    const user = await User.findById(device.user_id)
      .select("first_name last_name university_id profile_picture")
      .lean();

    if (!user) {
      return handleError(res, 404, "Device owner not found");
    }

    /* 5️⃣ Determine ENTRY / EXIT */
    const lastMovement = await Movement.findOne({ device_id: device._id })
      .sort({ created_at: -1 })
      .select("movement_type")
      .lean();

    const movement_type =
      lastMovement?.movement_type === "ENTRY" ? "EXIT" : "ENTRY";

    /* 6️⃣ Create movement log */
    const movement = await Movement.create({
      device_id: device._id,
      user_id: user._id,
      gate_id,
      movement_type,
      scan_method,
      alert_flag: false,
    });

    /* 7️⃣ Success response */
    return handleSuccess(res, 201, "Scan logged successfully", {
      scan: {
        movement_id: movement._id,
        movement_type,
        scan_method,
        scanned_at: movement.created_at,
      },
      user: {
        id: user._id,
        full_name: `${user.first_name} ${user.last_name}`,
        university_id: user.university_id,
        image: user.profile_picture || null,
      },
      device: {
        id: device._id,
        brand: device.brand,
        model: device.model,
        color: device.color,
        serial_number: device.serial_number,
        image: device.device_photo || null,
      },
      gate: {
        id: gate._id,
        name: gate.name,
        location: gate.location,
      },
    });
  } catch (error) {
    console.error("Scan device error:", error);
    return handleError(
      res,
      500,
      "Something went wrong while scanning the device"
    );
  }
};

// GET /api/movements/dashboard
const getDashboardSummary = async (req, res) => {
  try {
    // Count total entities
    const totalDevices = await Device.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalGates = await Gate.countDocuments();
    const totalLibraries = await Library.countDocuments();
    const totalMovements = await Movement.countDocuments();

    // Count users by role
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalStaff = await User.countDocuments({ role: "staff" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalSecurityChiefs = await User.countDocuments({ role: "security_chief" });
    const totalSecurityStaff = await User.countDocuments({ role: "security_staff" });

    return handleSuccess(res, 200, "Dashboard summary fetched successfully", {
      totalDevices,
      totalUsers,
      totalGates,
      totalLibraries,
      totalMovements,
      roles: {
        students: totalStudents,
        staff: totalStaff,
        admins: totalAdmins,
        securityChiefs: totalSecurityChiefs,
        securityStaff: totalSecurityStaff,
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return handleError(res, 500, "Failed to fetch dashboard summary");
  }
};


export { scanDevice,getDashboardSummary };
