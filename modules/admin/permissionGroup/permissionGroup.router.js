import express from "express"
const router = express.Router();
import PermissionGroupController from "./permissionGroup.controller.js";
// const AuthModel = require("../../auth/model");

import adminRouteGuard from "../../middlewares/adminRouteGuard.js"
import validator from "../../middlewares/validator.js"
import { param, body } from "express-validator"
import PERMISSONS from "../permissions.js"

router.get(
	"/",
	adminRouteGuard({ requirePermissions: [PERMISSONS.permissionGroups.read_permissionGroups] }),
	validator,
	PermissionGroupController.getPermissionGroups
);

router.post(
	"/",
	adminRouteGuard({ requirePermissions: [PERMISSONS.permissionGroups.create_permissionGroup] }),
	body("name").exists().isString(),
	body("permissions").exists().isArray(),
	validator,
	PermissionGroupController.createPermissionGroup
);

router.patch(
	"/:permissionGroupId",
	// adminRouteGuard({ requirePermissions: [PERMISSONS.permissionGroups.update_permissionGroup] }),
	param("permissionGroupId").isMongoId(),
	body("permissionGroup").optional(),
	validator,
	PermissionGroupController.updatePermissionGroup
);

router.get(
	"/:permissionGroupId",
	adminRouteGuard({ requirePermissions: [PERMISSONS.permissionGroups.read_permissionGroup] }),
	param("permissionGroupId").isMongoId(),
	validator,
	PermissionGroupController.getPermissionGroup
);

router.delete(
	"/:permissionGroupId",
	adminRouteGuard({ requirePermissions: [PERMISSONS.permissionGroups.delete_permissionGroup] }),
	param("permissionGroupId").isMongoId(),
	validator,
	PermissionGroupController.deletePermissionGroup
);

export default router;
