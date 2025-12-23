import mongoose from "mongoose"

const Schema = mongoose.Schema

const deviceTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  
}, { timestamps: true })

export default mongoose.model('DeviceType', deviceTypeSchema);