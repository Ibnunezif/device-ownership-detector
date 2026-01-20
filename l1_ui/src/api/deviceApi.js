// src/api/deviceApi.js
import httpClient from './httpClient';

// Register device (multipart/form-data)
export const registerDeviceApi = (formData) => {
  return httpClient.post('/devices/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Admin: fetch devices with pagination and filters
 * GET /devices
 */
export const getDevicesApi = (params) => {
  return httpClient.get('/devices', { params });
};

/**
 * User: fetch my devices with pagination and filters
 * GET /devices/my-devices
 */
export const getMyDevicesApi = (params) => {
  return httpClient.get('/devices/my-devices', { params });
};

/**
 * GET /device-type
 */
export const getDeviceTypesApi = () => {
  return httpClient.get('/device-type');
};

export const updateDeviceApi = () => {
  return httpClient.get('/device-type');
};
