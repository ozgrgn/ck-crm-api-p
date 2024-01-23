import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stars: { type: String, required: false },
    location: { type: String, required: false },
    map: { type: String, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("Hotel", HotelSchema);

export default {
  Hotel,
};
