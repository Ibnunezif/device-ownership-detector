// src/services/deviceService.js
import {
  registerDeviceApi,
  getDevicesApi,
  getMyDevicesApi,
  getDeviceTypesApi,
  updateDeviceApi,
} from '../api/deviceApi';

/**
 * Send device registration
 */
export const registerDevice = async (devicePayload, photos) => {
  const formData = new FormData();

  formData.append('user_id', devicePayload.ownerId);
  formData.append('device_type_id', devicePayload.deviceType);
  formData.append('brand', devicePayload.brand);
  formData.append('model', devicePayload.model);
  formData.append('serial_number', devicePayload.serialNumber);
  formData.append('color', devicePayload.color || 'Black');

  photos.forEach((photo) => {
    if (photo instanceof File) {
      formData.append('device_photo', photo);
    } else if (photo?.file instanceof File) {
      formData.append('device_photo', photo.file);
    }
  });

  const response = await registerDeviceApi(formData);
  return response.data;
};

/**
 * Admin: Fetch devices with pagination and filters
 */
export const getDevices = async ({
  page = 1,
  limit = 10,
  status,
  search,
} = {}) => {
  const response = await getDevicesApi({ page, limit, status, search });

  return {
    pagination: response.data.data.pagination,
    devices: response.data.data.devices,
  };
};

/**
 * User: Fetch my devices with pagination and filters
 */
export const getMyDevices = async ({
  page = 1,
  limit = 10,
  status,
  search,
} = {}) => {
  const response = await getMyDevicesApi({ page, limit, status, search });

  return {
    pagination: response.data.data.pagination,
    devices: response.data.data.devices,
  };
};

/**
 * Admin: find device in all devices list by id
 */
export const getDeviceById = async (deviceId) => {
  try {
    const { devices } = await getDevices({ page: 1, limit: 100 });
    const device = devices.find((d) => d.id === deviceId);
    return device || null;
  } catch (error) {
    console.error('Error fetching device by ID:', error);
    return null;
  }
};

/**
 * User: find device in my devices list by id
 */
export const getDeviceByIndividual = async (deviceId) => {
  try {
    const { devices } = await getMyDevices({ page: 1, limit: 100 });
    const device = devices.find((d) => d.id === deviceId);
    return device || null;
  } catch (error) {
    console.error('Error fetching device by ID:', error);
    return null;
  }
};

/**
 * Get device types
 */
export const getDeviceTypes = async () => {
  const response = await getDeviceTypesApi();
  return response.data.data.deviceTypes;
};


/**
 * General device update (supports optional file upload)
 * @param {string} deviceId - Device MongoDB ID
 * @param {Object} updates - Fields to update
 * @param {File} [photo] - Optional new device photo
 */
export const updateDevice = async (deviceId, updates = {}, photo) => {
  const formData = new FormData();

  Object.keys(updates).forEach((key) => {
    if (updates[key] !== undefined && updates[key] !== null) {
      formData.append(key, updates[key]);
    }
  });

  if (photo instanceof File) {
    formData.append('device_photo', photo);
  }

  const response = await updateDeviceApi(deviceId, formData);
  return response.data;
};

/**
 * Quick Action: Mark device as stolen
 * @param {string} deviceId
 */
export const markDeviceAsStolen = async (deviceId) => {
  return await updateDevice(deviceId, { status: 'stolen' });
};

/**
 * Quick Action: Verify device
 * @param {string} deviceId
 */
export const verifyDevice = async (deviceId) => {
  return await updateDevice(deviceId, { status: 'approved' });
};

export const blockDevice = async (deviceId) => {
  return await updateDevice(deviceId, { status: 'blocked' });
};
