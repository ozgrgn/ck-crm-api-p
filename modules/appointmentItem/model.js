import mongoose from "mongoose";

const AppointmentItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const AppointmentItem = mongoose.model("AppointmentItem", AppointmentItemSchema);

export default {
  AppointmentItem,
};
