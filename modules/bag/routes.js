import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.bags.create_bag] }),
  body(["name","treatmentGroup"]).optional(),
  validator,
  Controller.addBag
);

router.put(
  "/:bagId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.bags.update_bag] }),
  param("bagId").exists(),
  body(["bag"]).exists(),
  validator,
  Controller.updateBag
);

router.delete(
  "/:bagId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.bags.delete_bag] }),
  param("bagId").exists(),
  validator,
  Controller.deleteBag
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getBags
);

router.get(
  "/:bagId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.bags.read_bag] }),
  param("bagId").exists(),
  validator,
  Controller.getBag
);

export default router;
