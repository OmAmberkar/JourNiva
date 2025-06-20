import { ReadPreference } from "mongodb";
import mongoose, { mongo } from "mongoose";
import User from "./user.model";

const journal = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },

    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },

    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    mood: {
      type: String,
      enum: ["Angry", "Happy", "Sad"],
      default: "Happy",
    },

    content: {
      type: String,
      required: true,
    },

    coverImageUrl: {
      type: String,
      default: mongoose.Schema.Types.User,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Journals = mongoose.model("Journals", journal);

export default Journals;
