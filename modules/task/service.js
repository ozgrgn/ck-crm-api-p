import Model from "./model.js";
import ADMIN from "../admin/service.js";
import moment from "moment";

const getTasks = async (query = {}, options = {}) => {
  const { queryOptions } = options;
console.log(query,"aaaa")
  const tasks = await Model.Task.find(query, {}, queryOptions).populate([
    {
      path: "taskGiver",
      model: "admin",
    },
    {
      path: "taskTaker",
      model: "admin",
    },
  ]);

  const count = await Model.Task.countDocuments(query);

  return { tasks, count };
};

const getTask = async (query) => {
  return Model.Task.findOne(query);
};

const addTask = async (
  taskGiver,
  taskTaker,
  taskSummary,
  taskDescription,
  taskStartDate,
  taskEndDate,
  taskStatus,
  taskNote
) => {
  try {
    try {
    let event = {
      summary: `${taskSummary}`,
      description: `${taskDescription}`,
      startDate: moment(taskStartDate),
      endDate:  moment(taskStartDate),
    };
    ADMIN.addAnEventToAdminCalendar(taskTaker, event);
  } catch (error) {
    console.log("add Event service error", error);
    throw new Error(error.message);
  }


    return new Model.Task({
      taskGiver,
      taskTaker,
      taskSummary,
      taskDescription,
      taskStartDate,
      taskEndDate,
      taskStatus,
      taskNote,
    }).save();
  } catch (error) {
    console.log("addTask service error", error);
    throw new Error(error.message);
  }
};

const updateTask = async (taskId, task) => {
  try {
    let isExistTask = await Model.Task.findById(taskId);

    if (!isExistTask) {
      throw new Error(
        JSON.stringify({
          en: "Task is not found.",
          tr: "Task bulunamadı.",
        })
      );
    }

    return Model.Task.findOneAndUpdate(
      { _id: isExistTask._id },
      { ...task },
      { new: true }
    );
  } catch (error) {
    console.log("updateTask service error", error);
    throw new Error(error.message);
  }
};

const deleteTask = async (taskId) => {
  try {
    return Model.Task.deleteOne({ _id: taskId });
  } catch (error) {
    console.log("deleteTask service error", error);
    throw new Error(error.message);
  }
};

const getTaskViaPerma = async (query) => {
  return Model.Task.findOne(query);
};

export default {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
  getTask,
  getTaskViaPerma,
};
