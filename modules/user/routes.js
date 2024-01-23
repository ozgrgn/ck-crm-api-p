import express from "express";
import { body, query, param } from "express-validator";
import PERMISSONS from "../admin/permissions.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import routeGuard from "../middlewares/routeGuard.js";
import validator from "../middlewares/validator.js";
import Controller from "./controller.js";
const router = express.Router();
router.post(
  "/login",
  body(["password"]).exists().isString(),
  body(["email", "phone"]).optional(),
  validator,
  Controller.login
);

router.post(
  "/signup",
  body(["fullName", "email", "phone"]).exists(),
  body(["password", "consent"]).optional(),
  validator,
  Controller.signup
);
router.post(
  "/verifySignup",
  body(["userId", "authCode"]).exists(),
  validator,
  Controller.verifySignup
);

router.post(
  "/refreshVerification",
  body(["userId", "type"]).exists(),
  validator,
  Controller.refreshVerification
);

router.patch(
  "/",
  routeGuard(),
  body("user").exists(),
  validator,
  Controller.updateUser
);
router.delete(
  "/:userId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.users.delete_user] }),
  param("userId").exists(),
  validator,
  Controller.deleteUser
);

router.get(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.users.read_users] }),
  query(["startDate", "endDate"]).optional(),
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getUsers
);

router.get(
  "/check",
  query(["email", "phone"]).optional(),
  validator,
  Controller.checkUser
);

//password
router.post(
  "/change-password",
  routeGuard(),
  body(["oldPassword", "newPassword"]).exists().isString(),
  validator,
  Controller.changePassword
);

router.post(
  "/resetPasswordRequestWithPhone",
  body(["phone"]).exists().isString(),
  validator,
  Controller.resetPasswordRequestWithPhone
);

router.post(
  "/resetPasswordRequestWithEmail",
  body(["email"]).exists().isString(),
  validator,
  Controller.resetPasswordRequestWithEmail
);

router.post(
  "/resetPasswordVerify",
  body(["userId", "authCode", "newPassword"]).exists(),
  validator,
  Controller.resetPasswordVerify
);

router.post("/verifyToken", routeGuard(), Controller.verifyToken);

export default router;
