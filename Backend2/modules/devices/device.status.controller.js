import { Device } from "./device.model.js";

export const updateDeviceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["ACTIVE", "LOST", "STOLEN"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const device = await Device.findById(id);
  if (!device) {
    return res.status(404).json({ message: "Device not found" });
  }

  // Only owner or admin can update
  if (
    req.user.role !== "ADMIN" &&
    device.ownerId.toString() !== req.user.id
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  device.status = status;
  await device.save();

  res.json({
    message: `Device marked as ${status}`,
    device,
  });
};
