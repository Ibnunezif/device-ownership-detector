// src/services/deviceService.js
import {
  registerDeviceApi,
  getDevicesApi,
  getMyDevicesApi,
  getDeviceTypesApi,
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
