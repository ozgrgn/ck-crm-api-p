import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    description2: { type: String, required: false },
    department: { type: Boolean, required: false },
    svg: { type: String, required: false },
    perma: { type: String, required: false },
    text: { type: String, required: false },
    image: { type: String, required: false },
    order: { type: Number, required: false },
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", GroupSchema);

export default {
  Group,
};
