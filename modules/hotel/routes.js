import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.hotels.create_hotel] }),
  body(["name", "stars", "location", "map", "image"]).optional(),
  validator,
  Controller.addHotel
);

router.put(
  "/:hotelId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.hotels.update_hotel] }),
  param("hotelId").exists(),
  body(["hotel"]).exists(),
  validator,
  Controller.updateHotel
);

router.delete(
  "/:hotelId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.hotels.delete_hotel] }),
  param("hotelId").exists(),
  validator,
  Controller.deleteHotel
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getHotels
);

router.get(
  "/:hotelId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.hotels.read_hotel] }),
  param("hotelId").exists(),
  validator,
  Controller.getHotel
);

export default router;
