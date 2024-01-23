import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.mailTexts.create_mailText] }),
  body([
    "name","subject","mailMessage"
  ]).optional(),
  validator,
  Controller.addMailText
);

router.put(
  "/:mailTextId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.mailTexts.update_mailText] }),
  param("mailTextId").exists(),
  body(["mailText"]).exists(),
  validator,
  Controller.updateMailText
);

router.delete(
  "/:mailTextId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.mailTexts.delete_mailText] }),
  param("mailTextId").exists(),
  validator,
  Controller.deleteMailText
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getMailTexts
);

router.get(
  "/:mailTextId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.mailTexts.read_mailText] }),
  param("mailTextId").exists(),
  validator,
  Controller.getMailText
);


export default router;
