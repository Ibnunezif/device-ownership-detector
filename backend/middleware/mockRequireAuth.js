import mongoose from "mongoose";
// Middleware to mock security_chief authentication for testing purposes only
// you can replace the actual authentication implementation here
const mockRequireAuth = (req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId(), // sample objectId
    role: "security_chief",
  };
  next();
};

export default mockRequireAuth;
