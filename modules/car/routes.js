import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cars.create_car] }),
  body(["name", "plaka","image"]).optional(),
  validator,
  Controller.addCar
);

router.put(
  "/:carId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cars.update_car] }),
  param("carId").exists(),
  body(["car"]).exists(),
  validator,
  Controller.updateCar
);

router.delete(
  "/:carId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cars.delete_car] }),
  param("carId").exists(),
  validator,
  Controller.deleteCar
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getCars
);

router.get(
  "/:carId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.cars.read_car] }),
  param("carId").exists(),
  validator,
  Controller.getCar
);

export default router;
