import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.wpTexts.create_wpText] }),
  body([
    "name","wpMessage"
  ]).optional(),
  validator,
  Controller.addWpText
);

router.put(
  "/:wpTextId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.wpTexts.update_wpText] }),
  param("wpTextId").exists(),
  body(["wpText"]).exists(),
  validator,
  Controller.updateWpText
);

router.delete(
  "/:wpTextId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.wpTexts.delete_wpText] }),
  param("wpTextId").exists(),
  validator,
  Controller.deleteWpText
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getWpTexts
);

router.get(
  "/:wpTextId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.wpTexts.read_wpText] }),
  param("wpTextId").exists(),
  validator,
  Controller.getWpText
);


export default router;
