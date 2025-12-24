import Movement from "../Models/movement.model.js";
import Device from "../Models/device.model.js";

// Audit logging only: Create and List movements
// POST api/movements/create
// body: { device_id, movement_type, scan_method, gate_id?, library_id? }
const createMovement = async (req, res) => {
  try {
    const { device_id, movement_type, scan_method, gate_id, library_id } =
      req.body;

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user missing" });
    }

    // required fields
    if (!device_id || !movement_type || !scan_method) {
      return res.status(400).json({
        success: false,
        message: "device_id, movement_type and scan_method are required",
      });
    }

    // either gate_id or library_id may be provided (or neither), but not both populated simultaneously for a single checkpoint type
    if (gate_id && library_id) {
      return res.status(400).json({
        success: false,
        message: "Provide either gate_id or library_id, not both",
      });
    }

    // ensure user_id is captured for movement
    const device = await Device.findById(device_id);
    if (!device) {
      return res
        .status(404)
        .json({ success: false, message: "Device not found" });
    }

    const movement = await Movement.create({
      device_id,
      user_id: device.user_id,
      movement_type,
      scan_method,
      gate_id: gate_id || undefined,
      library_id: library_id || undefined,
      performed_by_user_id: req.user._id,
    });

    return res.status(201).json({ success: true, movement });
  } catch (error) {
    console.error("Failed to log movement", error);
    return res.status(500).json({
      success: false,
      message: "Failed to log movement",
      error: error.message,
    });
  }
};

// GET api/movements/all
// Optional query filters: device_id, movement_type
const getMovements = async (req, res) => {
  try {
    const { device_id, movement_type } = req.query;
    const filter = {};
    if (device_id) filter.device_id = device_id;
    if (movement_type) filter.movement_type = movement_type;

    const movements = await Movement.find(filter)
      .populate("device_id")
      .populate("gate_id")
      .populate("library_id")
      .populate("performed_by_user_id");

    if (movements.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No movements found" });
    }

    return res.json({ success: true, movements });
  } catch (error) {
    console.error("Failed to fetch movements", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch movements",
      error: error.message,
    });
  }
};

// POST api/movements/scan
// body: { barcode_data? , serial_number?, movement_type, scan_method, gate_id?, library_id? }
// Access: roles ['security_staff','security_chief'] only
// Behavior: verify device status and ALWAYS create a Movement entry
export const scanDevice = async (req, res) => {
  try {
    // auth required
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user missing" });
    }

    const allowedRoles = ["security_staff", "security_chief"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient role to scan",
      });
    }

    const {
      barcode_data,
      serial_number,
      movement_type,
      scan_method,
      gate_id,
      library_id,
    } = req.body;

    // Validation: one of barcode_data OR serial_number
    if (!barcode_data && !serial_number) {
      return res.status(400).json({
        success: false,
        message: "Provide either barcode_data or serial_number",
      });
    }
    if (barcode_data && serial_number) {
      return res.status(400).json({
        success: false,
        message: "Provide only one: barcode_data OR serial_number",
      });
    }

    // Validation: movement_type and scan_method required
    const validMovementTypes = ["entry", "exit"];
    const validScanMethods = ["barcode", "manual", "camera"];
    if (!movement_type || !validMovementTypes.includes(movement_type)) {
      return res.status(400).json({
        success: false,
        message: "movement_type must be one of: entry, exit",
      });
    }
    if (!scan_method || !validScanMethods.includes(scan_method)) {
      return res.status(400).json({
        success: false,
        message: "scan_method must be one of: barcode, manual, camera",
      });
    }

    // Validation: gate_id OR library_id required (but not both)
    if (!gate_id && !library_id) {
      return res.status(400).json({
        success: false,
        message: "Provide either gate_id or library_id",
      });
    }
    if (gate_id && library_id) {
      return res.status(400).json({
        success: false,
        message: "Provide either gate_id or library_id, not both",
      });
    }

    // Fetch device by barcode or serial
    const device = await Device.findOne(
      barcode_data ? { barcode_data } : { serial_number }
    );
    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    // Determine verification outcome
    let allowed = false;
    let alert_flag = false;
    switch (device.status) {
      case "approved":
        allowed = true;
        alert_flag = false;
        break;
      case "stolen":
        allowed = false;
        alert_flag = true;
        break;
      // 'lost' not present in schema; treat unknown/others as reject
      default:
        allowed = false;
        alert_flag = false;
        break;
    }

    // ALWAYS create Movement entry
    const movementDoc = await Movement.create({
      device_id: device._id,
      user_id: device.user_id,
      performed_by_user_id: req.user._id,
      gate_id: gate_id || undefined,
      library_id: library_id || undefined,
      scan_method,
      movement_type,
      alert_flag,
    });

    const response = {
      success: allowed,
      allowed,
      alert_flag,
      message: allowed
        ? alert_flag
          ? "Scan allowed with alert (stolen)."
          : "Scan allowed."
        : "Scan rejected: device not in an allowed status",
      device: {
        _id: device._id,
        serial_number: device.serial_number,
        barcode_data: device.barcode_data,
        status: device.status,
        user_id: device.user_id,
      },
      movement: movementDoc,
    };

    // If rejected, use 403; else 200
    return res.status(allowed ? 200 : 403).json(response);
  } catch (error) {
    console.error("Device scan failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process device scan",
      error: error.message,
    });
  }
};

// GET /api/movements/alerts
// Returns recent movements with alert_flag = true
// Access: security_staff | security_chief
export const getAlertMovements = async (req, res) => {
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

    const movements = await Movement.find({
      alert_flag: true,
    })
      .sort({ createdAt: -1 })
      .populate("device_id")
      .populate("gate_id")
      .populate("library_id")
      .populate("performed_by_user_id");

    return res.json({ success: true, movements });
  } catch (error) {
    console.error("Fetch alert movements failed", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch alert movements",
      error: error.message,
    });
  }
};

export { createMovement, getMovements, scanDevice, getAlertMovements };
