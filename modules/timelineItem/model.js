import mongoose from "mongoose";

const TimelineItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    custom:{ type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TimelineItem = mongoose.model("TimelineItem", TimelineItemSchema);

export default {
  TimelineItem,
};
