import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.timelineItems.create_timelineItem] }),
  body(["name","title","description","image"]).optional(),
  validator,
  Controller.addTimelineItem
);

router.put(
  "/:timelineItemId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.timelineItems.update_timelineItem] }),
  param("timelineItemId").exists(),
  body(["timelineItem"]).exists(),
  validator,
  Controller.updateTimelineItem
);

router.delete(
  "/:timelineItemId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.timelineItems.delete_timelineItem] }),
  param("timelineItemId").exists(),
  validator,
  Controller.deleteTimelineItem
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  query(["custom"]).optional(),

  validator,
  Controller.getTimelineItems
);

router.get(
  "/:timelineItemId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.timelineItems.read_timelineItem] }),
  param("timelineItemId").exists(),
  validator,
  Controller.getTimelineItem
);

export default router;
