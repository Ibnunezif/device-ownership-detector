import mongoose from "mongoose";
// Middleware to mock student authentication for testing purposes only
// you can replace the actual authentication implementation here
const mockStudentAuth = (req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId(), // sample objectId
    role: "student",
  };
  next();
};

export default mockStudentAuth;
