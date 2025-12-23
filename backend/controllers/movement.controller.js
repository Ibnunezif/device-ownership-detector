import Movement from "../Models/movement.model.js";

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

    const movement = await Movement.create({
      device_id,
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

// Audit logging: No update or delete operations
export { createMovement, getMovements };
