import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    whatsapp: String,
    password: String,
    job:String,
    permissionGroup: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "PermissionGroup",
    },
    isActive: { type: Boolean, default: true },
    super: { type: Boolean, default: false },
    credentials: { type: Object, default: null },
    image: { type: String, required: false },

  
  },
  { timestamps: true }
);

export const Admin = mongoose.model("admin", AdminSchema);

export default { Admin };
