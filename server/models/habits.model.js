import mongoose from "mongoose";
import User from "./user.model.js";

const checklist = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  }
}, { _id: false });

const habit = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  habitName: {
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

  habitDetail: {
    type: String,
    required: true
  },

  checklist: [checklist],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Habit', habit);