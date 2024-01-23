import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true },
    title: { type: String, required: false },
    perma: { type: String, required: true },
    spot: { type: String, required: false },
    header: { type: String, required: false },
    shortDesc: { type: String, required: false },
    description: { type: String, required: false },
    text: { type: String, required: false },
    hp: { type: Boolean, required: false },
    svg: { type: String, required: false },
    image: { type: String, required: false },
    images: { type: [], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, required: false },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Group"
  },
  },
  { timestamps: true }
);

export const Treatment = mongoose.model("Treatment", TreatmentSchema);

const TreatmentGroupSchema = new mongoose.Schema(
  {
    lang: String,
		name: String,
		name_BIG: String,
		groupImage: String,
		group: Boolean,
		shortDesc: String,
		order: Number,
		perma: String
  },
  { timestamps: true }
);

export const TreatmentGroup = mongoose.model("TreatmentGroup", TreatmentGroupSchema);


export default {
  Treatment,
  TreatmentGroup
};
