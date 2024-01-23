import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.appointmentItems.create_appointmentItem] }),
  body(["name"]).optional(),
  validator,
  Controller.addAppointmentItem
);

router.put(
  "/:appointmentItemId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.appointmentItems.update_appointmentItem] }),
  param("appointmentItemId").exists(),
  body(["appointmentItem"]).exists(),
  validator,
  Controller.updateAppointmentItem
);

router.delete(
  "/:appointmentItemId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.appointmentItems.delete_appointmentItem] }),
  param("appointmentItemId").exists(),
  validator,
  Controller.deleteAppointmentItem
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  query(["custom"]).optional(),

  validator,
  Controller.getAppointmentItems
);

router.get(
  "/:appointmentItemId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.appointmentItems.read_appointmentItem] }),
  param("appointmentItemId").exists(),
  validator,
  Controller.getAppointmentItem
);

export default router;
