import mongoose from "mongoose";

const gateSchema = new mongoose.Schema(
  {
   name : {
    type : String,
    required : true
   },
   description : {
    type : String,
    required : true
   },
   location : {
    type : String,
    required : true
   },
   created_by : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  },
  { timestamps: true }
);

const Gate = mongoose.model("Gate", gateSchema);

export default Gate;
