import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.payments.create_payment] }),
  body([
    "patient",
    "request",
    "paymentDate",
    "paymentTotal",
    "type",
  ]).optional(),
  validator,
  Controller.addPayment
);

router.put(
  "/:paymentId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.payments.update_payment] }),
  param("paymentId").exists(),
  body(["payment"]).exists(),
  validator,
  Controller.updatePayment
);

router.delete(
  "/:paymentId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.payments.delete_payment] }),
  param("paymentId").exists(),
  validator,
  Controller.deletePayment
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getPayments
);

router.get(
  "/:paymentId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.payments.read_payment] }),
  param("paymentId").exists(),
  validator,
  Controller.getPayment
);


export default router;
