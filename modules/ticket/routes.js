import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tickets.create_ticket] }),
  body([
    "patient",
    "request",
    "arrivalPNR",
    "arrivalFlightNo",
    "arrivalAirport",
    "arrivalDate",
    "arrivalPatient",
    "arrivalCompanion",
    "departurePNR",
    "departureFlightNo",
    "departureAirport",
    "departurePatient",
    "departureDate",
    "departureCompanion",
  ]).optional(),
  validator,
  Controller.addTicket
);

router.put(
  "/:ticketId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tickets.update_ticket] }),
  param("ticketId").exists(),
  body(["ticket"]).exists(),
  validator,
  Controller.updateTicket
);

router.delete(
  "/:ticketId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tickets.delete_ticket] }),
  param("ticketId").exists(),
  validator,
  Controller.deleteTicket
);
//warning adminRouteGuard
router.get(
  "/",
  query(["request"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getTickets
);

router.get(
  "/:ticketId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tickets.read_ticket] }),
  param("ticketId").exists(),
  validator,
  Controller.getTicket
);


export default router;
