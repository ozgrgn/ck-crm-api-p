import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    about_spot: { type: String, required: false },
    about_title: { type: String, required: false },
    about_left: { type: String, required: false },
    about_right: { type: String, required: false },
    images: { type: [], default: [] },
    logos: { type: [], default: [] },
  },
  { timestamps: true }
);

export const About = mongoose.model("About", AboutSchema);

export default {
  About,
};
