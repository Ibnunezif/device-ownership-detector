import mongoose from "mongoose";

const librariesSchema = new mongoose.Schema(
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

const Library = mongoose.model("Library", librariesSchema);

export default Library;
