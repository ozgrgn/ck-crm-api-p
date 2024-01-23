import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import adminRouteGuard from "../middlewares/adminRouteGuard.js";
import PERMISSONS from "../admin/permissions.js";
router.post(
  "/",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tasks.create_task] }),
  body([
    "taskGiver",
    "taskTaker",
    "taskSummary",
    "taskDescription",
    "taskStartDate",
    "taskEndDate",
    "taskStatus",
    "taskNote",
  ]).optional(),
  validator,
  Controller.addTask
);

router.put(
  "/:taskId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tasks.update_task] }),
  param("taskId").exists(),
  body(["task"]).exists(),
  validator,
  Controller.updateTask
);

router.delete(
  "/:taskId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tasks.delete_task] }),
  param("taskId").exists(),
  validator,
  Controller.deleteTask
);
//warning adminRouteGuard
router.get(
  "/",
  query(["limit", "skip"]).optional().toInt().isInt(),
  validator,
  Controller.getTasks
);

router.get(
  "/:taskId",
  adminRouteGuard({ requirePermissions: [PERMISSONS.tasks.read_task] }),
  param("taskId").exists(),
  validator,
  Controller.getTask
);

export default router;
