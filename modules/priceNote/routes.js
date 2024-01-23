import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.priceNotes.create_priceNote] }),
  body([
    "category",
    "status",
    "type",
    "date",
    "note",
    "request"
  ]).optional(),
  validator,
  Controller.addPriceNote
);

router.put(
  "/:priceNoteId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.priceNotes.update_priceNote] }),
  param("priceNoteId").exists(),
  body(["priceNote"]).exists(),
  validator,
  Controller.updatePriceNote
);

router.delete(
  "/:priceNoteId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.priceNotes.delete_priceNote] }),
  param("priceNoteId").exists(),
  validator,
  Controller.deletePriceNote
);
//warning adminRouteGuard
router.get(
  "/",
  query(["request"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getPriceNotes
);

router.get(
  "/:priceNoteId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.priceNotes.read_priceNote] }),
  param("priceNoteId").exists(),
  validator,
  Controller.getPriceNote
);

export default router;
