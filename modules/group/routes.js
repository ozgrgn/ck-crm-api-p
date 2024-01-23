import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.groups.create_group] }),
  body(["lang"]).exists(),
  body([
    "title",
    "description",
    "description2",
    "department",
    "svg",
    "perma", 
    "text",
    "image",
    "order"
  ]).optional(),
  validator,
  Controller.addGroup
);

router.put(
  "/:groupId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.groups.update_group] }),
  param("groupId").exists(),
  body(["group"]).exists(),
  validator,
  Controller.updateGroup
);

router.delete(
  "/:groupId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.groups.delete_group] }),
  param("groupId").exists(),
  validator,
  Controller.deleteGroup
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getGroups
);

router.get(
  "/:groupId",
  param("groupId").exists(),
  validator,
  Controller.getGroup
);
router.get(
  "/perma/:perma",
  param("perma").exists(),
  validator,
  Controller.getGroupViaPerma
);
export default router;
