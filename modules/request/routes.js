import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.requests.create_request] }),
  body([
    "isActive",
    "patient",
    "status",
    "lp",
    "name",
    "phone",
    "email",
    "message",
    "newForm_date",
    "newForm_user",
    "formInput",
    "message",
    "formSource",
    "treatmentGroup",
    "treatment",
    "customTreatment",
    "notes",
    "demand_date",
    "be_standby_time",
    "demand_user",
    "rep_user",
    "meetingDateConfirmDate",
    "meetingDate",
    "meetingDate_user",
    "standby_date",
    "standby_user",
    "continue_date",
    "continue_user",
    "price_date",
    "price_user",
    "currency",
    "price",
    "prePaymentDate",
    "prePaymentTotal",
    "prePaymentType",
    "prePaymentCurrency",
    "paymentWait_date",
    "be_priceStandby_time",
    "paymentWait_user",
    "priceStandby_date",
    "priceStandby_user",
    "confirm_date",
    "confirm_user",
  ]).optional(),
  validator,
  Controller.addRequest
);

router.put(
  "/:requestId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.requests.update_request] }),
  param("requestId").exists(),
  body(["request"]).exists(),
  validator,
  Controller.updateRequest
);

router.delete(
  "/:requestId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.requests.delete_request] }),
  param("requestId").exists(),
  validator,
  Controller.deleteRequest
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  query([
    "orderBy",
    "isActive",
    "startDate",
    "endDate",
    "status",
    "lp",
    "formInput",
    "formSource",
    "rep_user",
    "name",
    "customNo",
    "phone",
    "email",
    "status1",
    "status2",
    "status3",
    "status4",
    "status5",
    "status6",
    "status7",
  ]).optional(),
  validator,
  Controller.getRequests
);

router.get(
  "/dashboard/filter",
  query([
    "isActive",
    "startDate",
    "endDate",
    "status",
    "lp",
    "formInput",
    "formSource",
    "rep_user",
  ]).optional(),
  validator,
  Controller.getDashboardRequests
);

router.get(
  "/:requestId",
  param("requestId").exists(),
  validator,
  Controller.getRequest
);
export default router;
