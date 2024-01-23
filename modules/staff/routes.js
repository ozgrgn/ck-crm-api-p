import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.staffs.create_staff] }),
  body(["name", "job", "image", "phone", "email", "whatsapp"]).optional(),
  validator,
  Controller.addStaff
);

router.put(
  "/:staffId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.staffs.update_staff] }),
  param("staffId").exists(),
  body(["staff"]).exists(),
  validator,
  Controller.updateStaff
);

router.delete(
  "/:staffId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.staffs.delete_staff] }),
  param("staffId").exists(),
  validator,
  Controller.deleteStaff
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getStaffs
);

router.get(
  "/:staffId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.staffs.read_staff] }),
  param("staffId").exists(),
  validator,
  Controller.getStaff
);

export default router;
