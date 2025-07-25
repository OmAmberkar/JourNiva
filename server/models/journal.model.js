import mongoose, { Schema } from "mongoose";

export const MoodList = [
  "Calm",
  "Peaceful",
  "Happy",
  "Bright",
  "Loved",
  "Tired",
  "smile","wink","happy","neutral","sad"
];

//optionally mentioned so that if needed we could refer one
// export const MOOD_TYPES = [
//   "Happy","Sad","Angry","Excited","Calm","Stressed","Tired","Motivated","Grateful","Confused",
//   "Optimistic","Anxious","Lonely","Focused","Bored","Proud","Relaxed","Other",
// ];

const journalSchema = new mongoose.Schema(
  {
    _uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    nameSnapshot: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    mood: {
      type: String,
      enum: MoodList,
      default: "Happy",
    },
    cardImageUrl: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

journalSchema.index({ _uid: 1, date: -1 });
//something new that would create the b-tree in backend so as to make the searhing easy

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
