import mongoose from "mongoose";

const movementSchema = new mongoose.Schema(
  {
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    gate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gate",
    },
    library_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
    },
    performed_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movement_type: {
      type: String,
      enum: ["entry", "exit"],
      required: true,
    },
    scan_method: {
      type: String,
      enum: ["barcode", "manual", "camera"],
      required: true,
    },
    alert_flag: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movement", movementSchema);
