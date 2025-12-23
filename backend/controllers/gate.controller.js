import Gate from "../Models/gate.model.js";

// POST api/gates/create
// body: { name, location }
const createGate = async (req, res) => {
  try {
    const { name, location } = req.body;
    const userId = req.user?._id;

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: user missing" });
    }

    if (!name || !location) {
      return res
        .status(400)
        .json({ success: false, message: "Name and location are required" });
    }

    const existingGate = await Gate.findOne({ name, location });
    if (existingGate) {
      return res
        .status(400)
        .json({ success: false, message: "Gate already exists" });
    }

    const gate = await Gate.create({
      name,
      location,
      created_by_user_id: userId,
    });
    return res.status(201).json({ success: true, gate });
  } catch (error) {
    console.error("Failed to create gate", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create gate",
      error: error.message,
    });
  }
};

// GET api/gates/all
// No body
const getGates = async (req, res) => {
  try {
    const gates = await Gate.find();

    if (gates.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No gates found" });
    }

    return res.json({ success: true, gates });
  } catch (error) {
    console.error("Failed to fetch gates", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gates",
      error: error.message,
    });
  }
};

// PUT api/gates/update/:id
// body: { name, location }
// params: { id }
const updateGate = async (req, res) => {
  try {
    const { name, location } = req.body;
    const gateId = req.params.id;

    const existingGate = await Gate.findById(gateId);
    if (!existingGate) {
      return res
        .status(404)
        .json({ success: false, message: "Gate not found" });
    }

    const gate = await Gate.findByIdAndUpdate(
      gateId,
      { name, location },
      { new: true }
    );
    return res.json({
      success: true,
      message: "Gate updated successfully",
      gate,
    });
  } catch (error) {
    console.error("Failed to update gate", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update gate",
      error: error.message,
    });
  }
};

// DELETE api/gates/delete/:id
// params: { id }
const deleteGate = async (req, res) => {
  try {
    const gatedId = req.params.id;

    const existingGate = await Gate.findById(gatedId);
    if (!existingGate) {
      return res
        .status(404)
        .json({ success: false, message: "Gate not found" });
    }

    await Gate.findByIdAndDelete(gatedId);
    return res.json({ success: true, message: "Gate deleted successfully" });
  } catch (error) {
    console.error("Failed to delete gate", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete gate",
      error: error.message,
    });
  }
};

export { createGate, getGates, updateGate, deleteGate };
