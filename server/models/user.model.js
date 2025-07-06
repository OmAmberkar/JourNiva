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
        "https://res.cloudinary.com/dqzg7xw6j/image/upload/v1718361234/default_avatar.png",
    },
  },
  
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

export default Users;
