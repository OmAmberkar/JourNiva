import mongoose from "mongoose";
import User from "./user.model.js";

const goalSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  goalName: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  achieveByDate: {
    type: Date,
    required: true
  },
  icon: {
    type: String, // optional URL or icon name
    default: ""
  },
  goalDetails: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  checklist: [
    {
      date: {
        type: Date,
        required: true,
        default: Date.now
      },
      status: {
        type: Boolean,
        default: false
      }
    }
  ]
});

const Goals = mongoose.model("Goals", goalSchema);

export default Goals;
