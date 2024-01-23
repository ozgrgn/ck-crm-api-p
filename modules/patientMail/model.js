import mongoose from "mongoose";

const PatientMailSchema = new mongoose.Schema(
  {
    status:{ type: String, required: false },
    subject: { type: String, required: false },
    email: { type: String, required: false },
    text: { type: String, required: false },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Patient"
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Request"
    },
  },
  { timestamps: true }
);

export const PatientMail = mongoose.model("PatientMail", PatientMailSchema);

export default {
  PatientMail,
};
