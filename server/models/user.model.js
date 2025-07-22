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
      required: true,
    },


    avatarUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1471623817296-aa07ae5c9f47?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
