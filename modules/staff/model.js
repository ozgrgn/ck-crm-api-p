import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    job:{ type: String, required: false },
    phone:{ type: String, required: false },
    whatsapp:{ type: String, required: false },
    email:{ type: String, required: false },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const Staff = mongoose.model("Staff", StaffSchema);

export default {
  Staff,
};
