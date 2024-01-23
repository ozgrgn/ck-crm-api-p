import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.treatments.create_treatment],
  }),
  body(["lang"]).exists(),
  body([
    "title",
    "perma",
    "spot",
    "header",
    "shortDesc",
    "description",
    "text",
    "hp",
    "svg",
    "image",
    "images",
    "isActive",
    "order",
    "group",
  ]).optional(),
  validator,
  Controller.addTreatment
);

router.put(
  "/:treatmentId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.treatments.update_treatment],
  }),
  param("treatmentId").exists(),
  body(["treatment"]).exists(),
  validator,
  Controller.updateTreatment
);

router.delete(
  "/:treatmentId",
  adminRouteGuard({
    requirePermissions: [PERMISSONS.treatments.delete_treatment],
  }),
  param("treatmentId").exists(),
  validator,
  Controller.deleteTreatment
);

router.get(
  "/",
  query(["startDate", "isActive", "lang", "group"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getTreatments
);
router.get(
  "/all/treatmentGroup",
  query([ "isActive", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getTreatmentGroups
);
router.get(
  "/:treatmentId",
  param("treatmentId").exists(),
  validator,
  Controller.getTreatment
);

router.get(
  "/perma/:perma",
  param("perma").exists(),
  validator,
  Controller.getTreatmentViaPerma
);
router.get(
  "/group/:groupId",
  param("groupId").exists(),
  validator,
  Controller.getTreatmentViaGroupId
);
export default router;
