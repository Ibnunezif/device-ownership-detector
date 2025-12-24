import cloudinary from "../config/cloudinary.js";
import { getPublicIdFromUrl } from "./extractPublicId.js";

const deleteCloudinaryImage = async (imageUrl) => {
  if (!imageUrl) return;

  const publicId = getPublicIdFromUrl(imageUrl);

  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary image deleted successfully");
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
  }
};

export default deleteCloudinaryImage;
