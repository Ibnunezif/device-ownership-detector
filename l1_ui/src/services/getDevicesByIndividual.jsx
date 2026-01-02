import axios from "axios";

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

  const response = await axios.get(`${API_BASE_URL}/devices/my-devices`, {
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


export const getDeviceByIndividual = async (deviceId) => {
  try {
    const { devices } = await getDevices({ page: 1, limit: 100 }); // fetch all or adjust limit
    const device = devices.find(d => d.id === deviceId);
    return device || null; // return null if not found
  } catch (error) {
    console.error('Error fetching device by ID:', error);
    return null;
  }
};
