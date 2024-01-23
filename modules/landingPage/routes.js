import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.landingPages.create_landingPage] }),
  body([
    "patient",
    "request",
    "arrivalPNR",
    "arrivalFlightNo",
    "arrivalAirport",
    "arrivalDate",
    "arrivalPatient",
    "departurePNR",
    "departureFlightNo",
    "departureAirport",
    "departurePatient"
  ]).optional(),
  validator,
  Controller.addLandingPage
);

router.put(
  "/:landingPageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.landingPages.update_landingPage] }),
  param("landingPageId").exists(),
  body(["landingPage"]).exists(),
  validator,
  Controller.updateLandingPage
);

router.delete(
  "/:landingPageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.landingPages.delete_landingPage] }),
  param("landingPageId").exists(),
  validator,
  Controller.deleteLandingPage
);
//warning adminRouteGuard
router.get(
  "/",
  query(["request"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getLandingPages
);

router.get(
  "/:landingPageId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.landingPages.read_landingPage] }),
  param("landingPageId").exists(),
  validator,
  Controller.getLandingPage
);


export default router;
