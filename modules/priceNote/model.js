import mongoose from "mongoose";

const PriceNoteSchema = new mongoose.Schema(
  {
    category: { type: String, required: false },
    status: { type: String, required: false },
    type: { type: String, required: false },
    date: { type: String, required: false },
    note: { type: String, required: false },
    priceNote_user:{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Admin",
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Request",
    },
  },
  { timestamps: true }
);
export const PriceNote = mongoose.model("PriceNote", PriceNoteSchema);

export default {
  PriceNote,
};
