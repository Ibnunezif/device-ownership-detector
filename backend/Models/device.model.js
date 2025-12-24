import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    device_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeviceType",
      required: true,
    },

    brand: { type: String, required: true },

    model: { type: String, required: true },

    serial_number: {
      type: String,
      required: true,
      unique: true,
    },

    color: { type: String },

    device_photo: { type: String,required: true}, // Cloudinary URL

    status: {
      type: String,
      enum: ["pending", "approved", "stolen", "blocked"],
      default: "pending",
    },

    barcode_data: { type: String },

    id_generated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Device = mongoose.model("Device", deviceSchema);

export default Device;
