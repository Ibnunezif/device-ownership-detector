import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brand: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    photoUrl: { type: String },
    status: {
      type: String,
      enum: ["ACTIVE", "LOST", "STOLEN"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export const Device = mongoose.model("Device", deviceSchema);
