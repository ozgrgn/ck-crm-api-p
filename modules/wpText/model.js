import mongoose from "mongoose";

const WpTextSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    wpMessage: { type: String, required: false },
  },
  { timestamps: true }
);

export const WpText = mongoose.model("WpText", WpTextSchema);

export default {
  WpText,
};
