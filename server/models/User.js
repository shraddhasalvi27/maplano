import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "MANAGER", "DEVELOPER", "QA", "INTERN"],
    default: "DEVELOPER",
  },
}, { timestamps: true });

export default mongoose.model("User",userSchema);
