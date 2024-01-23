import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addAppointmentItem = async (req, res) => {
  const { name, title, description, image, custom } = req.body;

  try {
    let appointmentItem = await Service.addAppointmentItem(
      name,

    );

    return res.json({
      status: true,
      appointmentItem,
    });
  } catch (error) {
    console.log(error.message, "addAppointmentItem error");
    return res.json({ status: false, message: error.message });
  }
};

const updateAppointmentItem = async (req, res) => {
  const { appointmentItem } = req.body;
  const { appointmentItemId } = req.params;
  try {
    let updatedAppointmentItem = await Service.updateAppointmentItem(
      appointmentItemId,
      appointmentItem
    );

    return res.json({
      status: true,
      updatedAppointmentItem,
    });
  } catch (error) {
    console.log(error.message, "updateAppointmentItem error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteAppointmentItem = async (req, res) => {
  const { appointmentItemId } = req.params;

  try {
    await Service.deleteAppointmentItem(appointmentItemId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteAppointmentItem error");
    return res.json({ status: false, message: error.message });
  }
};

const getAppointmentItems = async (req, res) => {
  const { limit, skip, custom } = req.query;

  try {
    const timelineQuery = _.omitBy(
      {
        custom,
      },
      (a) => a === undefined
    );
    let appointmentItems = await Service.getAppointmentItems(timelineQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...appointmentItems });
  } catch (error) {
    console.log(error.message, "getAppointmentItems error");
    return res.json({ status: false, message: error.message });
  }
};

const getAppointmentItem = async (req, res) => {
  try {
    const AppointmentItemQuery = _.omitBy(
      {
        _id: req.params.appointmentItemId,
      },
      (a) => a === undefined
    );

    let appointmentItem = await Service.getAppointmentItem(AppointmentItemQuery);
    return res.json({ status: true, appointmentItem });
  } catch (error) {
    console.log(error.message, "getAppointmentItem error");
    return res.json({ status: false, message: error.message });
  }
};

const getAppointmentItemViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let appointmentItem = await Service.getAppointmentItemViaPerma(EventQuery);
    return res.json({ status: true, appointmentItem });
  } catch (error) {
    console.log(error.message, "getAppointmentItem error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addAppointmentItem,
  updateAppointmentItem,
  deleteAppointmentItem,
  getAppointmentItems,
  getAppointmentItem,
  getAppointmentItemViaPerma,
};
