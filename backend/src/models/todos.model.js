import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },
    isFinished: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: ["extreme", "moderate", "low"],
      trim: true,
      default: "moderate"
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "finished"],
      default: "pending"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;