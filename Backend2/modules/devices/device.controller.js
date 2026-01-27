import { Device } from "./device.model.js";
import QRCode from "qrcode";

export const registerDevice = async (req, res) => {
  const { brand, serialNumber, photoUrl } = req.body;

  const device = await Device.create({
    ownerId: req.user.id,
    brand,
    serialNumber,
    photoUrl,
  });

  const qrData = device._id.toString();

  const qrCode = await QRCode.toDataURL(qrData);

  res.status(201).json({
    message: "Device registered",
    device,
    qrCode,
  });
};
