// src/api/scanApi.js
import httpClient from '../api/httpClient';

// POST /api/movements/scan
export const scanDeviceApi = (payload) => {
  // payload: { barcode, gate_id, scan_method }
  return httpClient.post('/movements/scan', payload);
};
