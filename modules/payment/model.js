import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {

    paymentDate: { type: Date, required: false },
    paymentTotal: { type: Number, required: false },
    type: { type: String, required: false },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Request"
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Patient"
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", PaymentSchema);

export default {
  Payment,
};
