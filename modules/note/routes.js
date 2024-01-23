import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.notes.create_note] }),
  body([
    "category",
    "status",
    "type",
    "date",
    "message",
    "image",
    "request"
  ]).optional(),
  validator,
  Controller.addNote
);

router.put(
  "/:noteId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.notes.update_note] }),
  param("noteId").exists(),
  body(["note"]).exists(),
  validator,
  Controller.updateNote
);

router.delete(
  "/:noteId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.notes.delete_note] }),
  param("noteId").exists(),
  validator,
  Controller.deleteNote
);
//warning adminRouteGuard
router.get(
  "/",
  query(["request"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getNotes
);

router.get(
  "/:noteId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.notes.read_note] }),
  param("noteId").exists(),
  validator,
  Controller.getNote
);

export default router;
