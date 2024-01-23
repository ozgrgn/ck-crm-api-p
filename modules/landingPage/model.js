import mongoose from "mongoose";

const LandingPageSchema = new mongoose.Schema(
  {
    lpName: { type: String, required: false },
  },
  { timestamps: true }
);

export const LandingPage = mongoose.model("LandingPage", LandingPageSchema);

export default {
  LandingPage,
};
