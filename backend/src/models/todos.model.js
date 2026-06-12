import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim : true
    },

    description: {
      type: String,
      required: true,
      trim : true
    },
    isFinished: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: ["extreme", "moderate", "low"],
      trim : true,
      default: "moderate"
    },
    writtenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;