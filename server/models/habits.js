import mongoose, { mongo } from "mongoose";
import User from "./user.model";
const checklistSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  }
}, { _id: false });

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  checklist: [checklistSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Habit', habitSchema);
