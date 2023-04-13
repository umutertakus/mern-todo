import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { versionKey: false }
);

export const TodoModel = mongoose.model("todos", TodoSchema);
