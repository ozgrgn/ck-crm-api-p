import mongoose from "mongoose"

const PermissionGroupSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		permissions: { type: [String], required: true },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

export const PermissionGroup = mongoose.model("PermissionGroup", PermissionGroupSchema);

export default { PermissionGroup, PermissionGroupSchema };
