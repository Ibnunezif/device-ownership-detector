import axios from 'axios';

const API_URL = 'http://localhost:8080/api/devices'; // adjust if needed

export const registerDevice = async (deviceData, photos) => {
  const formData = new FormData();

  // Append device fields
  Object.keys(deviceData).forEach((key) => {
    if (deviceData[key]) {
      formData.append(key, deviceData[key]);
    }
  });

  // Append photos (max 4)
  photos.slice(0, 4).forEach((photo) => {
    formData.append('photos', photo.file);
  });

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
