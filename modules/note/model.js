import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    category: { type: String, required: false },
    status: { type: String, required: false },
    type: { type: String, required: false },
    date: { type: String, required: false },
    message: { type: String, required: false },
    image: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    note_user:{
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
export const Note = mongoose.model("Note", NoteSchema);

export default {
  Note,
};
