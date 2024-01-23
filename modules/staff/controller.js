import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addStaff = async (req, res) => {
  const { name, job, image, phone, email, whatsapp } = req.body;

  try {
    let staff = await Service.addStaff(
      name,
      job,
      image,
      phone,
      email,
      whatsapp
    );

    return res.json({
      status: true,
      staff,
    });
  } catch (error) {
    console.log(error.message, "addStaff error");
    return res.json({ status: false, message: error.message });
  }
};

const updateStaff = async (req, res) => {
  const { staff } = req.body;
  const { staffId } = req.params;
  try {
    let updatedStaff = await Service.updateStaff(staffId, staff);

    return res.json({
      status: true,
      updatedStaff,
    });
  } catch (error) {
    console.log(error.message, "updateStaff error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteStaff = async (req, res) => {
  const { staffId } = req.params;

  try {
    await Service.deleteStaff(staffId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteStaff error");
    return res.json({ status: false, message: error.message });
  }
};

const getStaffs = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let staffs = await Service.getStaffs({
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...staffs });
  } catch (error) {
    console.log(error.message, "getStaffs error");
    return res.json({ status: false, message: error.message });
  }
};

const getStaff = async (req, res) => {
  try {
    const StaffQuery = _.omitBy(
      {
        _id: req.params.staffId,
      },
      (a) => a === undefined
    );

    let staff = await Service.getStaff(StaffQuery);
    return res.json({ status: true, staff });
  } catch (error) {
    console.log(error.message, "getStaff error");
    return res.json({ status: false, message: error.message });
  }
};

const getStaffViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let staff = await Service.getStaffViaPerma(EventQuery);
    return res.json({ status: true, staff });
  } catch (error) {
    console.log(error.message, "getStaff error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addStaff,
  updateStaff,
  deleteStaff,
  getStaffs,
  getStaff,
  getStaffViaPerma,
};
