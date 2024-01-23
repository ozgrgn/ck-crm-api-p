import Model from "./model.js";

const getAppointmentItems = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const appointmentItems = await Model.AppointmentItem.find(
    query,
    {},
    queryOptions
  ).sort({ custom: -1 });
  console.log(query, "getTimeLineItems query");
  const count = await Model.AppointmentItem.countDocuments(query);

  return { appointmentItems, count };
};

const getAppointmentItem = async (query) => {
  return Model.AppointmentItem.findOne(query);
};

const addAppointmentItem = async (name) => {
  try {
    return new Model.AppointmentItem({
      name,

    }).save(); 
  } catch (error) {
    console.log("addAppointmentItem service error", error);
    throw new Error(error.message);
  }
};

const updateAppointmentItem = async (appointmentItemId, appointmentItem) => {
  try {
    let isExistAppointmentItem = await Model.AppointmentItem.findById(appointmentItemId);

    if (!isExistAppointmentItem) {
      throw new Error(
        JSON.stringify({
          en: "AppointmentItem is not found.",
          tr: "AppointmentItem bulunamadı.",
        })
      );
    }

    return Model.AppointmentItem.findOneAndUpdate(
      { _id: isExistAppointmentItem._id },
      { ...appointmentItem },
      { new: true }
    );
  } catch (error) {
    console.log("updateAppointmentItem service error", error);
    throw new Error(error.message);
  }
};

const deleteAppointmentItem = async (appointmentItemId) => {
  try {
    return Model.AppointmentItem.deleteOne({ _id: appointmentItemId });
  } catch (error) {
    console.log("deleteAppointmentItem service error", error);
    throw new Error(error.message);
  }
};

const getAppointmentItemViaPerma = async (query) => {
  return Model.AppointmentItem.findOne(query);
};

export default {
  addAppointmentItem,
  updateAppointmentItem,
  deleteAppointmentItem,
  getAppointmentItems,
  getAppointmentItem,
  getAppointmentItemViaPerma,
};
