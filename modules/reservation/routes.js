import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  body(["lang"]).exists(),
  body([
    "name",
    "phone",
    "date",
    "email",
    "treatment",
    "subject",
    "message",
    "image",
  ]).optional(),
  Controller.addReservation
);

router.put(
  "/:reservationId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.reservations.update_reservation],
  }),
  param("reservationId").exists(),
  body(["reservation"]).exists(),
  validator,
  Controller.updateReservation
);

router.delete(
  "/:reservationId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.reservations.delete_reservation],
  }),
  param("reservationId").exists(),
  validator,
  Controller.deleteReservation
);

router.get(
  "/",
  query(["isActive", "lang", "treatment","general"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getReservations
);

router.get(
  "/:reservationId",
  param("reservationId").exists(),
  validator,
  Controller.getReservation
);
export default router;
