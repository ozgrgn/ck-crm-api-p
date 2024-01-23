import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.patients.create_patient] }),
  body([
    "fullName",
    "phone",
    "email",
    "birthday",
    "country",
    "city",
    "referenceCat",
    "reference",
    "note",
  ]).optional(),
  validator,
  Controller.addPatient
);

router.put(
  "/:patientId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.patients.update_patient] }),
  param("patientId").exists(),
  body(["patient"]).exists(),
  validator,
  Controller.updatePatient
);

router.delete(
  "/:patientId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.patients.delete_patient] }),
  param("patientId").exists(),
  validator,
  Controller.deletePatient
);
//warning adminRouteGuard
router.get(
  "/",
  query(["lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getPatients
);

router.get(
  "/:patientId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.patients.read_patient] }),
  param("patientId").exists(),
  validator,
  Controller.getPatient
);

router.get(
  "/phone/:phone",
  adminRouteGuard({ requirePermissions: [PERMISSONS.patients.read_patient] }),
  param("phone").exists(),
  validator,
  Controller.getPatientbyPhone
);

export default router;
