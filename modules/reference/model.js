import mongoose from "mongoose";

const ReferenceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    referenceCat: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "ReferenceCat"
    },
  },
  { timestamps: true }
);

export const Reference = mongoose.model("Reference", ReferenceSchema);

export default {
  Reference,
};
