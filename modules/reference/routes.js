import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.references.create_reference] }),
  body([
    "name","referenceCat"
  ]).optional(),
  validator,
  Controller.addReference
);

router.put(
  "/:referenceId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.references.update_reference] }),
  param("referenceId").exists(),
  body(["reference"]).exists(),
  validator,
  Controller.updateReference
);

router.delete(
  "/:referenceId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.references.delete_reference] }),
  param("referenceId").exists(),
  validator,
  Controller.deleteReference
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getReferences
);

router.get(
  "/:referenceId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.references.read_reference] }),
  param("referenceId").exists(),
  validator,
  Controller.getReference
);


export default router;
