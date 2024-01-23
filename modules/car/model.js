import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    plaka:{ type: String, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const Car = mongoose.model("Car", CarSchema);

export default {
  Car,
};
