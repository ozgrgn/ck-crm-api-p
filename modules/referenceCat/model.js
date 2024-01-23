import mongoose from "mongoose";

const ReferenceCatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const ReferenceCat = mongoose.model("ReferenceCat", ReferenceCatSchema);

export default {
  ReferenceCat,
};
