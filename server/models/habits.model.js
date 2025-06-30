const mongoose = require('mongoose');
import User from "./user.model";
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
  checklist: [checklist],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Habit', habit);
