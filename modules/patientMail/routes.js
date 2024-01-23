import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  body([
    "patient",
    "status",
    "request",
    "email",
    "subject",
    "text",
  ]).optional(),
  Controller.addPatientMail
);

router.put(
  "/:patientMailId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.patientMails.update_patientMail],
  }),
  param("patientMailId").exists(),
  body(["patientMail"]).exists(),
  validator,
  Controller.updatePatientMail
);

router.delete(
  "/:patientMailId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.patientMails.delete_patientMail],
  }),
  param("patientMailId").exists(),
  validator,
  Controller.deletePatientMail
);

router.get(
  "/",
  query(["isActive", "lang", "treatment","general"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getPatientMails
);

router.get(
  "/:patientMailId",
  param("patientMailId").exists(),
  validator,
  Controller.getPatientMail
);
export default router;
