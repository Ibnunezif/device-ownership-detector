import { getDevices } from './deviceService';

export const getDeviceById = async (deviceId) => {
  try {
    const { devices } = await getDevices({ page: 1, limit: 100 }); // fetch all or adjust limit
    const device = devices.find(d => d.id === deviceId);
    return device || null; // return null if not found
  } catch (error) {
    console.error('Error fetching device by ID:', error);
    return null;
  }
};