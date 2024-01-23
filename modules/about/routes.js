import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.abouts.create_about] }),
  body(["lang"]).exists(),
  body([
    "about_spot",
    "about_title",
    "about_left",
    "about_right",
    "images",
    "logos",
  ]).optional(),
  validator,
  Controller.addAbout
);

router.put(
  "/:aboutId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.abouts.update_about] }),
  param("aboutId").exists(),
  body(["about"]).exists(),
  validator,
  Controller.updateAbout
);

router.delete(
  "/:aboutId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.abouts.delete_about] }),
  param("aboutId").exists(),
  validator,
  Controller.deleteAbout
);

router.get(
  "/",
  query(["startDate", "endDate", "lang"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getAbouts
);

router.get(
  "/:aboutId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.abouts.read_about] }),
  param("aboutId").exists(),
  validator,
  Controller.getAbout
);
export default router;
