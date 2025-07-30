import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
    },

    avatarUrl: {
      type: String,
      default:
        "https://imagizer.imageshack.com/img924/4476/roJLyv.png",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    accountType: {
      type: String,
      enum: ["journiva", "google"],
      default: "journiva",
    },

    googleId: {
      type: String,
      default: null,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpires: {
      type: Date,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
