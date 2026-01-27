import { Device } from "./device.model.js";

export const getAllDevices = async (req, res) => {
  const devices = await Device.find().populate("ownerId", "name studentId");
  res.json(devices);
};

export const getStolenDevices = async (req, res) => {
  const devices = await Device.find({ status: "STOLEN" })
    .populate("ownerId", "name studentId");
  res.json(devices);
};
