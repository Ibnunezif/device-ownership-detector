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

