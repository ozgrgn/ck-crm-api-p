import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskGiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Admin",
    },
    taskTaker: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Admin",
    },
    taskSummary: { type: String, required: false },
    taskDescription: { type: String, required: false },
    taskStartDate: { type: Date, required: false },
    taskEndDate: { type: Date, required: false },
    taskStatus: { type: Boolean, required: false },
    taskNote: { type: String, required: false },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);

export default {
  Task,
};
