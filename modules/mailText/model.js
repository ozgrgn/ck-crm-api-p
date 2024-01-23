import mongoose from "mongoose";

const MailTextSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: false },
    mailMessage: { type: String, required: false },
  },
  { timestamps: true }
);

export const MailText = mongoose.model("MailText", MailTextSchema);

export default {
  MailText,
};
