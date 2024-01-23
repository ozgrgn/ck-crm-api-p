import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
import mongoose from "mongoose";

const addTask = async (req, res) => {
  const admin = req.admin;
  const {
    taskGiver,
    taskTaker,
    taskSummary,
    taskDescription,
    taskStartDate,
    taskEndDate,
    taskStatus,
    taskNote,
  } = req.body;
  try {
    let task = await Service.addTask(
      admin.adminId,
      taskTaker,
      taskSummary,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskStatus,
      taskNote
    );

    return res.json({
      status: true,
      task,
    });
  } catch (error) {
    console.log(error.message, "addTask error");
    return res.json({ status: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { task } = req.body;
  const { taskId } = req.params;
  try {
    let updatedTask = await Service.updateTask(taskId, task);

    return res.json({
      status: true,
      updatedTask,
    });
  } catch (error) {
    console.log(error.message, "updateTask error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await Service.deleteTask(taskId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteTask error");
    return res.json({ status: false, message: error.message });
  }
};

const getTasks = async (req, res) => {
  const { limit, skip } = req.query;
  const admin = req.admin;

  try {
    const TaskQuery = _.omitBy(
      {
        taskGiver:
          admin.permissions.indexOf("leader") != -1
            ? mongoose.Types.ObjectId(admin.adminId)
            : undefined,
        taskTaker:
          admin.permissions.indexOf("leader") == -1 &&
          admin.permissions.indexOf("systemAdmin") == -1 &&
          !admin.super
            ? mongoose.Types.ObjectId(admin.adminId)
            : undefined,
      },
      (a) => a === undefined
    );
    console.log(admin);
    if (admin.permissions.indexOf("leader") == -1) {
      TaskQuery;
    }

    let tasks = await Service.getTasks(TaskQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...tasks });
  } catch (error) {
    console.log(error.message, "getTasks error");
    return res.json({ status: false, message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const TaskQuery = _.omitBy(
      {
        _id: req.params.taskId,
      },
      (a) => a === undefined
    );

    let task = await Service.getTask(TaskQuery);
    return res.json({ status: true, task });
  } catch (error) {
    console.log(error.message, "getTask error");
    return res.json({ status: false, message: error.message });
  }
};

const getTaskViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let task = await Service.getTaskViaPerma(EventQuery);
    return res.json({ status: true, task });
  } catch (error) {
    console.log(error.message, "getTask error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  getTask,
  getTaskViaPerma,
};
