import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    birthday: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    note: { type: String, required: false },
    referenceCat: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "ReferenceCat"
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Reference"
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", PatientSchema);

export default {
  Patient,
};
