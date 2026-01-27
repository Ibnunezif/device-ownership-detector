import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    studentId: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["STUDENT", "SECURITY", "ADMIN"],
      default: "STUDENT",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
