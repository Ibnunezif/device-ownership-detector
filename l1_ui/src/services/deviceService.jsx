import axios from 'axios';

export const registerDevice = async (devicePayload, photos) => {
  const formData = new FormData();

  formData.append('user_id', devicePayload.ownerId);
  formData.append('device_type_id', devicePayload.deviceType); // must match backend ID
  formData.append('brand', devicePayload.brand);
  formData.append('model', devicePayload.model);
  formData.append('serial_number', devicePayload.serialNumber);
  formData.append('color', devicePayload.color || 'Black');
  photos.forEach((photo) => {
    formData.append('device_photo', photo.file);
  });
 const token = localStorage.getItem('authToken');
  const response = await axios.post(
    'https://pc-ownership-backend-api.onrender.com/api/devices/register',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data',
                 'Authorization': `Bearer ${token}`
       }
    }
  );

  return response.data;
};


const API_BASE_URL = 'https://pc-ownership-backend-api.onrender.com/api';

/**
 * Fetch devices with pagination and filters
 */
export const getDevices = async ({
  page = 1,
  limit = 10,
  status,
  search
} = {}) => {
  const token = localStorage.getItem('authToken');

  const response = await axios.get(`${API_BASE_URL}/devices`, {
    params: {
      page,
      limit,
      status,
      search
    },
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTRiOWNjOTNlMGQ0MTU5MjdmMjJlY2IiLCJpYXQiOjE3NjcyMTI1OTUsImV4cCI6MTc2NzQ3MTc5NX0.jwBE4_sj5kOsdA7QRMKcVkwC_bTQt9WLqeJ0PzQgq6g`
    }
  });

  /**
   * Backend response format:
   * {
   *   ok: true,
   *   status: 200,
   *   message: "...",
   *   data: {
   *     pagination: {...},
   *     devices: [...]
   *   }
   */

  return {
    pagination: response.data.data.pagination,
    devices: response.data.data.devices
  };
};
