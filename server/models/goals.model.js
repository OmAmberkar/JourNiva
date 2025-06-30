import mongoose from "mongoose";
import User from "./user.model";

const goal = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  expectedDate: {
    type: Date,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  details: {
    type: String
  },
  progress: {
    type: boolean, 
    default: False
  },
  boardImages: {
    type: String,
    default: "https://res.cloudinary.com/dqzg7xw6j/image/upload/v1718361234/default_avatar.png"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Goal = mongoose.model("Goal", goal);
export default Goal;
