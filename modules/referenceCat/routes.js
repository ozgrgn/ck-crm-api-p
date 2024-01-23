import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceCats.create_referenceCat] }),
  body([
    "name"
  ]).optional(),
  validator,
  Controller.addReferenceCat
);

router.put(
  "/:referenceCatId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceCats.update_referenceCat] }),
  param("referenceCatId").exists(),
  body(["referenceCat"]).exists(),
  validator,
  Controller.updateReferenceCat
);

router.delete(
  "/:referenceCatId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceCats.delete_referenceCat] }),
  param("referenceCatId").exists(),
  validator,
  Controller.deleteReferenceCat
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getReferenceCats
);

router.get(
  "/:referenceCatId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.referenceCats.read_referenceCat] }),
  param("referenceCatId").exists(),
  validator,
  Controller.getReferenceCat
);


export default router;
