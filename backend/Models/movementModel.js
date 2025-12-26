import mongoose from "mongoose";

const movementSchema = new mongoose.Schema(
  {
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gate",
      required: true,
    },
    worker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: false,
    },

    movement_type: {
      type: String,
      required: true,
      enum: ["ENTRY", "EXIT"]
    },

    scan_method: {
      type: String,
      required: true,
      enum: ["BARCODE", "CAMERA", "MANUAL"]
    },

    alert_flag: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Movement = mongoose.model("Movement", movementSchema);

export default Movement;
