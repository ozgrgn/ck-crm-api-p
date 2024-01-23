import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    phone: String,
    promo: Boolean,
    primaryCity: String,
    tags: [String],
    isActive: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    consent: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);



const VerificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User"
    },
    authCode: String,
    expireDate: { type: Date, expires: "3m", default: Date.now },
    type: String
  },
  { timestamps: true }
);

export const Verification = mongoose.model("Verification", VerificationSchema);


export default { User, Verification }