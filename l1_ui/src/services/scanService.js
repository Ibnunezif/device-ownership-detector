// src/services/scanService.js
import { scanDeviceApi } from '../api/scanApi';

// Map backend response -> UI ScanResult shape
const mapScanResponseToResult = (data) => {
  const { scan, user, device, gate } = data;

  // If backend adds status later, map it here; default ACTIVE for now
  const status = device?.status === 'STOLEN'
    ? 'STOLEN'
    : device?.status === 'BLOCKED'
    ? 'BLOCKED'
    : 'ACTIVE';

  return {
    // existing UI fields
    serialNumber: device.serial_number,
    brand: device.brand,
    status,
    deviceImage: device.image,
    deviceImageAlt: `${device.brand} ${device.model} device image`,

    ownerName: user.full_name,
    studentId: user.university_id,
    ownerEmail: '',          // not in current response
    ownerPhone: '',          // not in current response
    ownerAvatar: user.image,
    ownerAvatarAlt: user.full_name,
    registeredAt: scan.scanned_at,

    // extra context if you want later
    gateName: gate.name,
    gateLocation: gate.location,

    timestamp: scan.scanned_at,
  };
};

export const scanDevice = async ({ barcode, gateId, scanMethod }) => {
  const response = await scanDeviceApi({
    barcode,
    gate_id: gateId,
    scan_method: scanMethod, // 'BARCODE' | 'CAMERA' | 'MANUAL'
  });

  return mapScanResponseToResult(response.data.data);
};
