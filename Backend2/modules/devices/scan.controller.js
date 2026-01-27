import { Device } from "./device.model.js";
import { Log } from "../logs/log.model.js";
import { User } from "../users/user.model.js";

export const scanDevice = async (req, res) => {
  const { deviceId, action } = req.body;

  const device = await Device.findById(deviceId).populate("ownerId");
  if (!device)
    return res.status(404).json({ message: "Device not found" });

  // LOG the scan
  await Log.create({
    deviceId: device._id,
    scannedBy: req.user.id,
    action,
    statusAtScan: device.status,
  });

  // ALERT if stolen
  if (device.status === "STOLEN") {
    return res.status(403).json({
      alert: "🚨 STOLEN DEVICE",
      owner: device.ownerId.name,
      device,
    });
  }

  res.json({
    message: "Device verified",
    owner: {
      name: device.ownerId.name,
      studentId: device.ownerId.studentId,
    },
    device: {
      brand: device.brand,
      serialNumber: device.serialNumber,
      status: device.status,
    },
  });
};
