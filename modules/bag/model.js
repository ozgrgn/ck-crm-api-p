import mongoose from "mongoose";

const BagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    treatmentGroup: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "TreatmentGroup",
    },
  },
  { timestamps: true }
);

export const Bag = mongoose.model("Bag", BagSchema);

export default {
  Bag,
};
